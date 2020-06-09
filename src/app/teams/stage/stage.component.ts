import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {DigitalRelayState, selectUsersList} from '../../store';
import {adapter} from '../../store/user-model/user-model.reducer';
import {map} from 'rxjs/operators';
import {UserModel} from '../../store/user-model/user-model.model';
import {Team} from '../../api/models/team';
import {StageModel} from '../../store/stage-model/stage-model.model';
import {hoursMinutesSecondsString, hoursMinutesString, raceDayDifference, tempoString} from '../../globals';
import {MatDialog} from '@angular/material/dialog';
import {TempoDialogComponent, TempoDialogModel} from '../tempo-dialog/tempo-dialog.component';
import {TimeDialogComponent, TimeDialogModel} from '../time-dialog/time-dialog.component';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  @Output()
  public stageChange = new EventEmitter<{ stage: StageModel, forceSave: boolean | null }>();

  @Input() team: Team;
  @Input() index: number;
  @Input() stage: StageModel;
  @Input() estimatedStart: number;
  @Input() realStart: number;
  @Input() started: boolean;
  name: string;
  users: UserModel[];
  selectedUserValue: string;
  selectedUser: UserModel;
  estimatedTempo: number;

  constructor(private store: Store<DigitalRelayState>, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.name = `Úsek ${this.index + 1}`;
    this.estimatedTempo = Math.floor(this.stage.estimated_time / this.stage.length);
    this.store.pipe(
      select(selectUsersList),
      select(adapter.getSelectors().selectAll),
      map((u: UserModel[]) => u.filter(userModel => userModel.email === this.stage.email))
    ).subscribe(user => {
      if (user.length > 0) {
        this.selectedUserValue = user[0].email;
      } else {
        this.selectedUserValue = '';
      }
    });
    this.store.pipe(
      select(selectUsersList),
      select(adapter.getSelectors().selectAll),
      map((u: UserModel[]) => u.filter(userModel => this.team.members.includes(userModel.email)))
    ).subscribe(users => {
      this.users = users;
    });

  }

  onUserChange($value) {
    this.selectedUser = this.users.find((user) => user.email === $value);
    this.estimatedTempo = this.selectedUser.tempo;
    this.stageChange.emit({
      stage: {...this.stage, email: $value, estimated_time: this.estimatedTempo * this.stage.length},
      forceSave: false
    });
  }

  tempoDialog(): void {
    const message = `Tu môžete upraviť predpokladané tempo pre ${this.name}.`;

    const dialogData = new TempoDialogModel('Úprava tempa', message, this.estimatedTempo);

    const dialogRef = this.dialog.open(TempoDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.estimatedTempo = dialogResult.tempo;
        this.stageChange.emit({stage: {...this.stage, estimated_time: this.estimatedTempo * this.stage.length}, forceSave: false});
      }
    });
  }

  timeDialog(): void {
    const message = `Tu môžete upraviť čas príchodu do cieľa pre ${this.name}.`;

    const dialogData = new TimeDialogModel('Úprava času cieľa',
      message,
      Math.floor((this.realStart + this.stage.real_time) / (60 * 60)),
      (Math.floor((this.realStart + this.stage.real_time) / 60) % 60));

    const dialogRef = this.dialog.open(TimeDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.stage.real_time = dialogResult.hours * 60 * 60 + dialogResult.minutes * 60 - this.realStart;
        this.stageChange.emit({stage: this.stage, forceSave: false});
      }
    });
  }

  getTimeString(time: number, mode: 'hms' | 'tempo' | 'hm') {
    if (mode === 'hms') {
      return hoursMinutesSecondsString(time);
    }
    if (mode === 'hm') {
      return hoursMinutesString(time);
    }
    return tempoString(time);
  }

  stageInProgress() {
    return (!this.stage.real_time && this.started && raceDayDifference() === 0);
  }

  improvement(information: 'start' | 'end' | 'duration' | 'tempo'): number {
    switch (information) {
      case 'start':
        return (this.estimatedStart) - (this.realStart);
      case 'end':
        return (this.estimatedStart + this.stage.estimated_time) - (this.realStart + this.stage.real_time);
      case 'duration':
        return (this.stage.estimated_time) - (this.stage.real_time);
      case 'tempo':
        return (this.estimatedTempo) - (this.stage.real_time / this.stage.length);
    }
  }

  getChangeClasses(information: 'start' | 'end' | 'duration' | 'tempo'): string[] {
    const result: string[] = [];
    switch (information) {
      case 'start':
        result.push(this.started ? 'final' : 'estimate');
        break;
      case 'end':
        result.push(this.stageFinished() ? 'final' : 'estimate');
        break;
      default:
        result.push('final');
        break;
    }
    const improvement = this.improvement(information);
    if (improvement > 0) {
      result.push('ahead');
    } else if (improvement < 0) {
      result.push('behind');
    }
    return result;
  }

  stageFinished() {
    return !!this.stage.real_time;
  }

  finishStage() {
    const finishTime = new Date();
    const realDuration = (finishTime.getHours() * 60 * 60 + finishTime.getMinutes() * 60 + finishTime.getSeconds()) - this.realStart;
    this.stageChange.emit({stage: {...this.stage, real_time: realDuration}, forceSave: true});
  }
}
