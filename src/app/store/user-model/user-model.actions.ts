import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {UserModel} from './user-model.model';

export const loadUserModels = createAction(
  '[UserModel/API] Load UserModels',
  props<{ userModels: UserModel[] }>()
);

export const addUserModel = createAction(
  '[UserModel/API] Add UserModel',
  props<{ userModel: UserModel }>()
);

export const upsertUserModel = createAction(
  '[UserModel/API] Upsert UserModel',
  props<{ userModel: UserModel }>()
);

export const addUserModels = createAction(
  '[UserModel/API] Add UserModels',
  props<{ userModels: UserModel[] }>()
);

export const upsertUserModels = createAction(
  '[UserModel/API] Upsert UserModels',
  props<{ userModels: UserModel[] }>()
);

export const updateUserModel = createAction(
  '[UserModel/API] Update UserModel',
  props<{ userModel: Update<UserModel> }>()
);

export const updateUserModels = createAction(
  '[UserModel/API] Update UserModels',
  props<{ userModels: Update<UserModel>[] }>()
);

export const deleteUserModel = createAction(
  '[UserModel/API] Delete UserModel',
  props<{ id: string }>()
);

export const deleteUserModels = createAction(
  '[UserModel/API] Delete UserModels',
  props<{ ids: string[] }>()
);

export const clearUserModels = createAction(
  '[UserModel/API] Clear UserModels'
);

