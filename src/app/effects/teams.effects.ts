import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
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
import {MatSnackBar} from '@angular/material/snack-bar';
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
  loadMy: Observable<any> = this.actions$.pipe(
    ofType('[Teams] Load my teams'),
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
  loadAll: Observable<any> = this.actions$.pipe(
    ofType('[Teams] Load all teams'),
    switchMap(() => {
      return this.teamsService.getAllTeams().pipe(
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
          this.snackBar.open('Úseky uložené.', 'OK', {duration: 2000});
          return upsertTeamModel({teamModel: (teams as TeamModel)});
        }));
    }));

  loadOne$ = createEffect(() => this.actions$.pipe(
    ofType('[Teams] Load one team'),
    mergeMap((action: any) => {
      return this.teamsService.getTeamResource(action.id);
    }),
    map(team => upsertTeamModel({teamModel: team as TeamModel}))
  ));

  acceptRelay$ = createEffect(() => this.actions$.pipe(
    ofType('[Teams] Accept relay'),
    map((action: any) => {
      if ((localStorage.getItem('lastAcceptedStage') as unknown as number) < action.stageIndex) {
        localStorage.setItem('lastAcceptedStage', action.stageIndex);
        return this.teamsService.postAcceptRelay({teamId: action.teamId, Authorization: this.token});
      }
    }),
    mergeMap(r => {
      this.snackBar.open('Štafeta prebratá', 'OK', {duration: 2000});
      return of(r);
    })
  ), {dispatch: false});

  uploadTeamModel$ = createEffect(() => this.actions$.pipe(
    ofType('[TeamModel] Upload TeamModel'),
    mergeMap((action: any) => this.teamsService.postTeamResource({
      payload: action.teamModel,
      teamId: action.teamModel.id,
      Authorization: this.token
    })),
    map(teamModel => upsertTeamModel({teamModel: teamModel as TeamModel}))
  ));

  constructor(
    private actions$: Actions,
    private teamsService: TeamsService,
    private snackBar: MatSnackBar,
    store: Store<DigitalRelayState>,
    private router: Router
  ) {
    this.state = store.select(selectUser);
    this.state.subscribe(state => this.token = state.token);
  }
}
