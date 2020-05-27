import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {TeamsService} from '../api/services';
import {State} from '../store/reducers/auth.reducer';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../store';
import {loadFailure, loadSuccess} from '../store/actions/users.actions';
import {upsertUserModels} from '../store/user-model/user-model.actions';
import {UserList} from '../api/models/user-list';
import {UserModel} from '../store/user-model/user-model.model';

@Injectable()
export class UsersEffects {

  state: Observable<State>;
  // noinspection JSUnusedLocalSymbols
  loadSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Users] Load success'),
    map((users: UserList) => {
      return upsertUserModels({userModels: users.users as UserModel[]});
    })
  ));

  loadFailure$ = createEffect(() => this.actions$.pipe(
    ofType('[Users] Load failure')
  ), {dispatch: false});
  private token: string;

  @Effect()
  load: Observable<any> = this.actions$.pipe(
    ofType('[Users] Load users'),
    map(value => value as { teamId: string }),
    switchMap((team) => {
      return this.teamsService.getTeamMembers(team.teamId).pipe(
        map((users) => {
          return loadSuccess(users as UserList);
        }),
        catchError((error) => {
          return of(loadFailure(error.error));
        }));
    }));

  constructor(
    private actions$: Actions,
    private teamsService: TeamsService,
    store: Store<DigitalRelayState>
  ) {
    this.state = store.select(selectUser);
    this.state.subscribe(state => this.token = state.token);
  }
}
