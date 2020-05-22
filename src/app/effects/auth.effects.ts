import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {AuthService} from '../api/services/auth.service';
import {LoginRequest} from '../api/models/login-request';
import {catchError, map, switchMap} from 'rxjs/operators';
import {loginFailure, loginSuccess} from '../store/actions/auth.actions';
import {JWTResponse} from "../api/models/jwtresponse";
import {Observable, of} from "rxjs";


@Injectable()
export class AuthEffects {

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType('[Login] Login request'),
    map(value => value as LoginRequest),
    switchMap(payload => {
      return this.authApi.postLogin({email: payload.email, password: payload.password}).pipe(
        map((user) => {
          return loginSuccess(user as JWTResponse);
        }),
        catchError((error) => {
          return of(loginFailure(error.error));
        }))
    }));


  // noinspection JSUnusedLocalSymbols
  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login success')
  ), {dispatch: false});

  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login failure')
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private authApi: AuthService,
  ) {
  }

}
