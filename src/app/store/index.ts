import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAuth from './reducers/auth.reducer';
import {routerReducer, RouterReducerState, SerializedRouterStateSnapshot} from '@ngrx/router-store';
import * as fromTeamModel from './team-model/team-model.reducer';
import * as fromUserModel from './user-model/user-model.reducer';


export interface DigitalRelayState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  auth: fromAuth.State;
  teamModel: fromTeamModel.State;
  users: fromUserModel.State;
}

export const reducers: ActionReducerMap<DigitalRelayState> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  teamModel: fromTeamModel.reducer,
  users: fromUserModel.reducer
};

export const metaReducers: MetaReducer<DigitalRelayState>[] = !environment.production ? [] : [];

export const selectUser = (state: DigitalRelayState) => state.auth;
export const selectLoginStatus = (state: DigitalRelayState) => state.auth.isLoggedIn;
export const selectTeamsList = (state: DigitalRelayState) => state.teamModel;
export const selectUsersList = (state: DigitalRelayState) => state.users;


export const initialTestState = {
  auth: {isLoggedIn: false},
  teamModel: fromTeamModel.initialState,
  users: fromUserModel.initialState
};
