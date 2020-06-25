import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {getSecondsSinceMidnight, hoursMinutesString, raceDayDifference} from '../../globals';
import {DigitalRelayState, selectTeamsList} from '../../store';
import {select, Store} from '@ngrx/store';
import {updateStages} from '../../store/actions/teams.actions';
import {cloneDeep} from 'lodash';
import {TeamModel} from '../../store/team-model/team-model.model';
import {StageModel} from '../../store/stage-model/stage-model.model';
import {adapter} from '../../store/team-model/team-model.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit, AfterViewInit, OnDestroy {

  private sub: Subscription;

  @Input()
  team: TeamModel;
  public updatedStages: StageModel[] = [];
  public estimatedStartTimes: number[] = [];
  public realStartTimes: number[] = [];
  scrollIndex = 0;

  constructor(private store: Store<DigitalRelayState>) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.store.pipe(
      select(selectTeamsList),
      select(adapter.getSelectors().selectEntities)
    ).subscribe(entities => {
      this.updatedStages = cloneDeep(entities[this.team.id].stages);
      this.team = cloneDeep(entities[this.team.id]);
      this.updatedStages.forEach((value, index) => {
        if (index === 0) {
          this.estimatedStartTimes.push(this.team.start);
          this.realStartTimes.push(this.team.start);
        } else {
          this.estimatedStartTimes.push(this.estimatedStartTimes[index - 1] + this.updatedStages[index - 1].estimated_time);
          if (this.updatedStages[index - 1].real_time) {
            this.realStartTimes.push(this.realStartTimes[index - 1] + this.updatedStages[index - 1].real_time);
          } else {
            if (!this.scrollIndex) {
              this.scrollIndex = index - 1;
            }
            this.realStartTimes.push(this.realStartTimes[index - 1] + this.updatedStages[index - 1].estimated_time);
          }
        }
      });
    });
  }

  updateStartTimes(startIndex) {
    this.updatedStages.slice(startIndex).forEach((value, index) => {
      this.estimatedStartTimes[startIndex + index] =
        ((startIndex + index) === 0 ? this.team.start :
          this.updatedStages[startIndex + index - 1].estimated_time + this.estimatedStartTimes[startIndex + index - 1]);
      this.realStartTimes[startIndex + index] =
        ((startIndex + index) === 0 ? this.team.start :
          (this.updatedStages[startIndex + index - 1].real_time ? this.updatedStages[startIndex + index - 1].real_time :
            this.updatedStages[startIndex + index - 1].estimated_time) + this.realStartTimes[startIndex + index - 1]);
    });
  }

  updateStage($event: { stage: StageModel; forceSave: boolean }, i: number) {
    this.updatedStages[i] = cloneDeep($event.stage);
    this.updateStartTimes(i);
    if ($event.forceSave) {
      this.submit();
    }
  }

  submit() {
    this.store.dispatch(updateStages({teamId: this.team.id, stages: cloneDeep(this.updatedStages)}));
  }

  trackById = (index, stage) => stage.id;

  getStartTimeString(start: number): string {
    return hoursMinutesString(start);
  }

  ngAfterViewInit(): void {
    if (raceDayDifference() == 0) {
      setTimeout(() => this.scroll(document.getElementById(`stage-${this.scrollIndex}`)), 0);
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  isStageStarted(i: number): boolean {
    const time = getSecondsSinceMidnight();
    return (i > 0 ? !!(this.updatedStages[i - 1].real_time) : (time >= this.team.start));
  }
}
