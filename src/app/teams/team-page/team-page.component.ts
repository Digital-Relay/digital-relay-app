import {Component, OnDestroy, OnInit} from '@angular/core';
import {DigitalRelayState, selectTeamsList} from '../../store';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {adapter} from '../../store/team-model/team-model.reducer';
import {Team} from '../../api/models/team';
import {load} from '../../store/actions/users.actions';
import {uploadTeamModel} from '../../store/team-model/team-model.actions';
import {TeamModel} from '../../store/team-model/team-model.model';
import {loadOne} from '../../store/actions/teams.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit, OnDestroy {

  team: Team = null;
  loading = true;
  private sub: Subscription;

  constructor(private store: Store<DigitalRelayState>, private readonly route: ActivatedRoute, private router: Router
  ) {
    this.loading = true;
  }

  public ngOnDestroy(): void {
  }

  public ngOnInit() {
    this.loading = true;
    this.sub = this.route.paramMap.pipe(
      map(_ => _.get('id')),
      switchMap((id) => {
        this.store.dispatch(loadOne({id}));
        return this.store.pipe(
          select(selectTeamsList),
          select(adapter.getSelectors().selectEntities),
          select(entities => entities[id])
        );
      })).subscribe(team => {
      if (!team || !team.stages) {
        this.loading = true;
      } else {
        this.team = team;
        this.store.dispatch(load({teamId: team.id}));
        this.loading = false;
      }
    });
  }

  onMemberAdded($event) {
    const team = {...this.team, members: [...this.team.members, $event.email]};
    this.store.dispatch(uploadTeamModel({teamModel: team as TeamModel}));
  }

  onMemberRemoved($event: { email: string }) {
    const team = {...this.team, members: this.team.members.filter((value) => (value != $event.email))};
    delete team.stages;
    this.store.dispatch(uploadTeamModel({teamModel: team as TeamModel}));
  }

  onTeamEdited($event: { name: string; donation: number }) {
    const team = {...this.team, name: $event.name, donation: $event.donation};
    this.store.dispatch(uploadTeamModel({teamModel: team as TeamModel}));
  }
}
