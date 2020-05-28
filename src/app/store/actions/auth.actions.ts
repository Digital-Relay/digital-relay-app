import {createAction, props} from '@ngrx/store';
import {JWTResponse} from '../../api/models/jwtresponse';
import {ErrorResponse} from '../../api/models/error-response';
import {UserModel} from '../user-model/user-model.model';

export const login = createAction(
  '[Login] Login request',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login success',
  props<JWTResponse>()
);

export const renewLogin = createAction(
  '[Login] Renew login',
  props<any>()
);

export const logout = createAction(
  '[Logout]',
  props<any>()
);

export const loginFailure = createAction(
  '[Login] Login failure',
  props<ErrorResponse>()
);

export const uploadProfile = createAction(
  '[Profile] Upload',
  props<{ user: UserModel }>()
);

export const editProfile = createAction(
  '[Profile] Edit',
  props<{ user: UserModel }>()
);
