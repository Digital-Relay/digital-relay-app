import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';

import {AuthService} from '../api/services/auth.service';
import {LoginRequest} from '../api/models/login-request';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {editProfile, loginFailure, loginSuccess, renewLogin} from '../store/actions/auth.actions';
import {JWTResponse} from '../api/models/jwtresponse';
import {Observable, of} from 'rxjs';
import {DigitalRelayState, selectUser} from '../store';
import {Store} from '@ngrx/store';
import {refreshTokenLocalStorage} from '../globals';
import {Router} from '@angular/router';
import {clearTeamModels} from '../store/team-model/team-model.actions';
import {UsersService} from '../api/services/users.service';
import {State} from '../store/reducers/auth.reducer';
import {UserModel} from '../store/user-model/user-model.model';
import {loadMy} from '../store/actions/teams.actions';
import {SwPush} from '@angular/service-worker';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class AuthEffects {
  intervalId = null;
  token: string;
  state: Observable<State>;

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType('[Login] Login request'),
    map(value => value as LoginRequest),
    switchMap(payload => {
      return this.authApi.postLogin({email: payload.email, password: payload.password}).pipe(
        map((user) => {
          return loginSuccess(user);
        }),
        catchError((error) => {
          return of(loginFailure(error.error));
        }));
    }));

  @Effect()
  refreshLogin: Observable<any> = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT, '[Login] Renew login'),
    filter(() => {
      return localStorage.getItem(refreshTokenLocalStorage) != null;
    }),
    switchMap(() => {
      const refreshToken = localStorage.getItem(refreshTokenLocalStorage);
      return this.authApi.getTokenRefresh(refreshToken).pipe(
        map((user: JWTResponse) => loginSuccess(user)),
        catchError((error) => {
          return of(loginFailure(error.error));
        }));
    }));


  // noinspection JSUnusedLocalSymbols
  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login success'),
    map(value => value as JWTResponse),
    map((action, num) => {
      if (action.refresh_token != null) {
        localStorage.setItem(refreshTokenLocalStorage, 'JWT ' + action.refresh_token);
      }
      if (this.intervalId != null) {
        clearInterval(this.intervalId);
      }
      setInterval(() => {
        this.store.dispatch(renewLogin({}));
      }, action.expires_at * 1000 - Date.now());
      this.swPush.requestSubscription({serverPublicKey: environment.pushPublicKey})
        .then(value => {
          return this.authApi.createPushSubscriptionResponse({Authorization: this.token, payload: value})
            .subscribe((response) => {
              if (response.status === 200) {
                this.snackBar.open('Notifikácie boli aktivované.', 'OK', {duration: 2000});
              }
            });
        })
        .catch(reason => {
          this.authApi.enableEmailNotifications(this.token).pipe(
            catchError((error) => {
              this.snackBar.open('Nepodarilo sa zapnúť notifikácie: ' + reason + ' ' + error, 'OK', {duration: 5000});
              return of();
            })
          ).subscribe(() =>
            this.snackBar.open('Nepodarilo sa zapnúť PUSH notifikácie, budeme posielať notifikácie e-mailom.', 'OK', {duration: 5000}));
        });
      return loadMy({});
    })
  ));

  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login failure')
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType('[Logout]'),
    map(() => {
      localStorage.removeItem(refreshTokenLocalStorage);
      this.router.navigate(['/']);
      return clearTeamModels();
    })
  ));

  uploadProfile$ = createEffect(() => this.actions$.pipe(
    ofType('[Profile] Upload'),
    switchMap((action: any) => {
      return this.usersApi.postUserResource({
        payload: action.user,
        Authorization: this.token
      }).pipe(
        map((editedUser) => editProfile({user: editedUser as UserModel})),
        catchError((error) => of(error))
      );
    })
  ));

  editProfile$ = createEffect(() => this.actions$.pipe(
    ofType('[Profile] Edit')
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private authApi: AuthService,
    private store: Store<DigitalRelayState>,
    private router: Router,
    private usersApi: UsersService,
    private swPush: SwPush,
    private snackBar: MatSnackBar
  ) {
    this.state = store.select(selectUser);
    this.state.subscribe(state => this.token = state.token);
  }

}
