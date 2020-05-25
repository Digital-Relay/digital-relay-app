import {UserModel} from '../user-model/user-model.model';
import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  isLoggedIn: boolean;
  user: UserModel | null;
  errorMessage: string | null;
  token: string | null;
  expiresAt: number | null;
}

export const initialState: State = {
  isLoggedIn: false,
  user: null,
  errorMessage: null,
  token: null,
  expiresAt: null
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    isLoggedIn: true,
    token: "JWT " + action.access_token,
    expiresAt: action.expires_at,
    user: action.user as UserModel
  })),
  on(AuthActions.loginFailure, ((state, action) => ({...state, errorMessage: action.msg}))),
  on(AuthActions.logout, (() => ({...initialState})))
);


