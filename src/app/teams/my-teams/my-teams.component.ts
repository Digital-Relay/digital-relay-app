import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {DigitalRelayState, selectTeamsList} from '../../store';
import {Observable} from 'rxjs';
import {adapter, State} from '../../store/team-model/team-model.reducer';
import {TeamModel} from '../../store/team-model/team-model.model';
import {load} from '../../store/actions/teams.actions';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  teams: Observable<TeamModel[]>;
  state: Observable<State>;
  loading = false;
  errorMessage = '';

  constructor(private store: Store<DigitalRelayState>) {
    this.teams = store.pipe(
      select(selectTeamsList),
      select(adapter.getSelectors().selectAll)
    );
  }

  ngOnInit(): void {
    this.state = this.store.select(selectTeamsList);
    this.state.subscribe((state) => {
      this.loading = state.loading;
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(load({}));
  }
}

@Pipe({name: 'mapToArray'})
export class MapToArray implements PipeTransform {
  transform(value): any {
    const arr = [];
    for (const key in value) {
      arr.push(value[key]);
    }
    return arr;
  }
}
