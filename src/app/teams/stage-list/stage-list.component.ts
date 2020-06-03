import {Component, Input, OnInit} from '@angular/core';
import {hoursMinutesString} from '../../globals';
import {DigitalRelayState} from '../../store';
import {Store} from '@ngrx/store';
import {updateStages} from '../../store/actions/teams.actions';
import {cloneDeep} from 'lodash';
import {TeamModel} from '../../store/team-model/team-model.model';
import {StageModel} from '../../store/stage-model/stage-model.model';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {
  @Input()
  team: TeamModel;
  public updatedStages: StageModel[] = [];
  public startTimes: number[] = [];

  constructor(private store: Store<DigitalRelayState>) {
  }

  ngOnInit(): void {
    this.updatedStages = cloneDeep(this.team.stages);
    this.updatedStages.forEach((value, index) => {
      if (index === 0) {
        this.startTimes.push(this.team.start);
      } else {
        this.startTimes.push(this.startTimes[index - 1] + this.updatedStages[index - 1].estimated_time);
      }
    });
  }

  updateStartTimes(startIndex) {
    this.updatedStages.slice(startIndex).forEach((value, index) => {
      this.startTimes[startIndex + index] =
        ((startIndex + index) === 0 ? this.team.start :
          this.updatedStages[startIndex + index - 1].estimated_time + this.startTimes[startIndex + index - 1]);
    });
  }

  updateStage($event: StageModel, i: number) {
    this.updatedStages[i] = $event;
    this.updateStartTimes(i);
  }

  submit() {
    this.store.dispatch(updateStages({teamId: this.team.id, stages: this.updatedStages}));
  }

  trackById = (index, stage) => stage.id;

  getStartTimeString(start: number): string {
    return hoursMinutesString(start);
  }
}
