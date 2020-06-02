import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {DigitalRelayState, selectUsersList} from '../../store';
import {adapter} from '../../store/user-model/user-model.reducer';
import {map} from 'rxjs/operators';
import {UserModel} from '../../store/user-model/user-model.model';
import {Team} from '../../api/models/team';
import {StageModel} from '../../store/stage-model/stage-model.model';
import {hoursMinutesSecondsString, tempoString} from '../../globals';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  @Output()
  public stageChange = new EventEmitter<StageModel>();

  @Input()
  team: Team;
  @Input()
  index: number;
  @Input()
  stage: StageModel;
  @Input()
  estimatedStart: number;
  name: string;
  users: UserModel[];
  selectedUserValue: string;
  selectedUser: UserModel;
  estimatedTempo: number;

  constructor(private store: Store<DigitalRelayState>) {
  }

  ngOnInit(): void {
    this.name = `Úsek ${this.index + 1}`;
    this.store.pipe(
      select(selectUsersList),
      select(adapter.getSelectors().selectAll),
      map((u: UserModel[]) => u.filter(userModel => userModel.email === this.stage.email))
    ).subscribe(user => {
      if (user.length > 0) {
        this.estimatedTempo = user[0].tempo;
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
    this.stageChange.emit({...this.stage, email: $value, estimated_time: this.estimatedTempo * this.stage.length});
  }

  getTimeString(time: number, mode: 'hms' | 'tempo') {
    if (mode === 'hms') {
      return hoursMinutesSecondsString(time);
    }
    return tempoString(time);
  }
}
