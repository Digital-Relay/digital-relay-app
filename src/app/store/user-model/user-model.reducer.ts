import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {UserModel} from './user-model.model';
import * as UserModelActions from './user-model.actions';

export const userModelsFeatureKey = 'userModels';

export interface State extends EntityState<UserModel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(UserModelActions.addUserModel,
    (state, action) => adapter.addOne(action.userModel, state)
  ),
  on(UserModelActions.upsertUserModel,
    (state, action) => adapter.upsertOne(action.userModel, state)
  ),
  on(UserModelActions.addUserModels,
    (state, action) => adapter.addMany(action.userModels, state)
  ),
  on(UserModelActions.upsertUserModels,
    (state, action) => adapter.upsertMany(action.userModels, state)
  ),
  on(UserModelActions.updateUserModel,
    (state, action) => adapter.updateOne(action.userModel, state)
  ),
  on(UserModelActions.updateUserModels,
    (state, action) => adapter.updateMany(action.userModels, state)
  ),
  on(UserModelActions.deleteUserModel,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(UserModelActions.deleteUserModels,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(UserModelActions.loadUserModels,
    (state, action) => adapter.setAll(action.userModels, state)
  ),
  on(UserModelActions.clearUserModels,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
