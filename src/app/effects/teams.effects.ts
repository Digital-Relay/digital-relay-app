import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {TeamsService} from '../api/services';
import {State} from '../store/reducers/auth.reducer';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../store';
import {TeamsList} from '../api/models/teams-list';
import {loadFailure, loadSuccess} from '../store/actions/teams.actions';
import {loadTeamModels, upsertTeamModel} from '../store/team-model/team-model.actions';
import {TeamModel} from '../store/team-model/team-model.model';
import {Team} from '../api/models/team';
import {Router} from '@angular/router';
import {Stage} from '../api/models';
import PostTeamsParams = TeamsService.PostTeamsParams;

@Injectable()
export class TeamsEffects {

  state: Observable<State>;
  // noinspection JSUnusedLocalSymbols
  loadSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Teams] Load success'),
    map((teams: TeamsList) => {
      return loadTeamModels({teamModels: teams.teams as TeamModel[]});
    })
  ));

  loadFailure$ = createEffect(() => this.actions$.pipe(
    ofType('[Teams] Load failure')
  ), {dispatch: false});
  private token: string;

  @Effect()
  load: Observable<any> = this.actions$.pipe(
    ofType('[Teams] Load teams'),
    switchMap(() => {
      return this.teamsService.getTeams(this.token).pipe(
        map((teams) => {
          return loadSuccess(teams as TeamsList);
        }),
        catchError((error) => {
          return of(loadFailure(error.error));
        }));
    }));

  @Effect()
  create: Observable<any> = this.actions$.pipe(
    ofType('[Teams] Create new team'),
    map(value => value as TeamModel),
    switchMap((action) => {
      return this.teamsService.postTeams({
        payload: {
          members: action.members,
          name: action.name as string
        } as Team,
        Authorization: this.token
      } as unknown as PostTeamsParams).pipe(
        map((teams) => {
          this.router.navigate(['teams', teams.id]);
          return upsertTeamModel({teamModel: (teams as TeamModel)});
        }),
        catchError((error) => {
          return of(loadFailure(error.error));
        }));
    }));

  @Effect()
  update: Observable<any> = this.actions$.pipe(
    ofType('[Teams] Update team stages'),
    map(value => value as { teamId: string, stages: Stage[] }),
    switchMap((action) => {
      return this.teamsService.postStages({
        teamId: action.teamId,
        payload: {
          stages: action.stages
        },
        Authorization: this.token
      }).pipe(
        map((teams) => {
          return upsertTeamModel({teamModel: (teams as TeamModel)});
        }));
    }));

  constructor(
    private actions$: Actions,
    private teamsService: TeamsService,
    store: Store<DigitalRelayState>,
    private router: Router
  ) {
    this.state = store.select(selectUser);
    this.state.subscribe(state => this.token = state.token);
  }
}
