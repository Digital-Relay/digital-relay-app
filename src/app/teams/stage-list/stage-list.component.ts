import {Component, Input, OnInit} from '@angular/core';
import {nrOfStages} from '../../globals';
import {DigitalRelayState} from '../../store';
import {Store} from '@ngrx/store';
import {updateStages} from '../../store/actions/teams.actions';
import {cloneDeep} from 'lodash';
import {Stage} from '../../api/models/stage';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {
  stages: Array<number>;
  @Input()
  team;
  private updatedStages = [];

  constructor(private store: Store<DigitalRelayState>) {
    this.stages = new Array(nrOfStages).fill(1);
  }

  ngOnInit(): void {
  }

  updateStage($event: { name: string | null; email: string }, i: number) {
    this.updatedStages.push({i, email: $event});
  }

  submit() {
    const stages = cloneDeep(this.team.stages);
    this.updatedStages.forEach(i => {
      stages[i.i] = i.email;
    });
    const result = [];
    stages.forEach((value, index) => result.push({index, email: value}));
    this.store.dispatch(updateStages({teamId: this.team.id, stages: result as Stage[]}));
  }
}
