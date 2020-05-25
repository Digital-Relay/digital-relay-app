import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';

import {AuthService} from '../api/services/auth.service';
import {LoginRequest} from '../api/models/login-request';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {loginFailure, loginSuccess, renewLogin} from '../store/actions/auth.actions';
import {JWTResponse} from "../api/models/jwtresponse";
import {Observable, of} from "rxjs";
import {DigitalRelayState} from "../store";
import {Store} from "@ngrx/store";
import {refreshTokenLocalStorage} from "../globals";
import {Router} from "@angular/router";


@Injectable()
export class AuthEffects {
  intervalId = null;

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
        }))
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
        }))
    }));


  // noinspection JSUnusedLocalSymbols
  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login success'),
    map(value => value as JWTResponse),
    map((action, num) => {
      if (action.refresh_token != null) {
        localStorage.setItem(refreshTokenLocalStorage, "JWT " + action.refresh_token)
      }
      if (this.intervalId != null) {
        clearInterval(this.intervalId)
      }
      setInterval(() => {
        this.store.dispatch(renewLogin({}))
      }, action.expires_at * 1000 - Date.now())
    })
  ), {dispatch: false});

  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login failure')
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType('[Logout]'),
    map(() => {
      localStorage.removeItem(refreshTokenLocalStorage);
      this.router.navigate(['/'])
    })
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private authApi: AuthService,
    private store: Store<DigitalRelayState>,
    private router: Router
  ) {
  }

}
