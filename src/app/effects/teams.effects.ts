import {Injectable} from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {TeamsService} from "../api/services";
import {State} from "../store/reducers/auth.reducer";
import {Store} from "@ngrx/store";
import {DigitalRelayState, selectUser} from "../store";
import {TeamsList} from "../api/models/teams-list";
import {loadFailure, loadSuccess} from "../store/actions/teams.actions";
import {loadTeamModels, upsertTeamModel} from "../store/team-model/team-model.actions";
import {TeamModel} from "../store/team-model/team-model.model";
import PostTeamsParams = TeamsService.PostTeamsParams;

@Injectable()
export class TeamsEffects {

  state: Observable<State>
  // noinspection JSUnusedLocalSymbols
  loadSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Load] Load success'),
    map((teams: TeamsList) => {
      return loadTeamModels({teamModels: teams.teams.map(team => team as TeamModel)})
    })
  ), {dispatch: false});
  loadFailure$ = createEffect(() => this.actions$.pipe(
    ofType('[Load] Load failure')
  ), {dispatch: false});
  private token: string;
  @Effect()
  load: Observable<any> = this.actions$.pipe(
    ofType('[Load] Load teams'),
    switchMap(() => {
      return this.teamsService.getTeams(this.token).pipe(
        map((teams) => {
          return loadSuccess(teams as TeamsList);
        }),
        catchError((error) => {
          return of(loadFailure(error.error));
        }))
    }));
  @Effect()
  create: Observable<any> = this.actions$.pipe(
    ofType('[Create] Create new team'),
    map(value => value as TeamModel),
    switchMap((action) => {
      return this.teamsService.postTeams({
        team: {
          members: action.members,
          name: action.name as String
        },
        Authorization: this.token
      } as unknown as PostTeamsParams).pipe(
        map((teams) => {
          return upsertTeamModel({teamModel: (teams as TeamModel)});
        }),
        catchError((error) => {
          return of(loadFailure(error.error));
        }))
    }));

  constructor(
    private actions$: Actions,
    private teamsService: TeamsService,
    store: Store<DigitalRelayState>
  ) {
    this.state = store.select(selectUser)
    this.state.subscribe(state => this.token = state.token)
  }
}
