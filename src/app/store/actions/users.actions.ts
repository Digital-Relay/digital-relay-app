import {createAction, props} from '@ngrx/store';
import {ErrorResponse} from '../../api/models/error-response';
import {UserList} from '../../api/models';

export const load = createAction(
  '[Users] Load users',
  props<{ teamId: string }>()
);

export const loadSuccess = createAction(
  '[Users] Load success',
  props<UserList>()
);

export const loadFailure = createAction(
  '[Users] Load failure',
  props<ErrorResponse>()
);
