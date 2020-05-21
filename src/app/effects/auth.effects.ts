import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {AuthService} from '../api/services/auth.service';
import {LoginRequest} from '../api/models/login-request';
import {catchError, map, switchMap} from 'rxjs/operators';
import {loginFailure, loginSuccess} from '../store/actions/auth.actions';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login request'),
    switchMap((action: any) => {
      return this.authApi.postLogin({email: action.email, password: action.password} as LoginRequest)
        .pipe(
          map(jwtResponse => {
            console.log(jwtResponse);
            return loginSuccess(jwtResponse);
          }),
          catchError(error => {
            console.log(error);
            return loginFailure;
          }));
    })
  ));
  // noinspection JSUnusedLocalSymbols
  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Login] Login success'),
    map((val) => console.log)
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private authApi: AuthService,
  ) {
  }

}
