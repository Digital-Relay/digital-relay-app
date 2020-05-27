import {Component, OnInit} from '@angular/core';
import {DigitalRelayState, selectTeamsList} from '../../store';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {adapter} from '../../store/team-model/team-model.reducer';
import {Team} from '../../api/models/team';
import {load} from '../../store/actions/users.actions';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  team: Team = null;

  constructor(private store: Store<DigitalRelayState>, private readonly route: ActivatedRoute,
  ) {
  }

  public ngOnInit() {
    this.route.paramMap.pipe(
      map(_ => _.get('id')),
      switchMap((id) => {
        return this.store.pipe(
          select(selectTeamsList),
          select(adapter.getSelectors().selectEntities),
          select(entities => entities[id])
        );
      })).subscribe(team => {
      this.team = team;
      this.store.dispatch(load({teamId: team.id}));
    });
  }

}
