import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAuth from './reducers/auth.reducer';
import {routerReducer, RouterReducerState, SerializedRouterStateSnapshot} from '@ngrx/router-store';
import * as fromTeamModel from './team-model/team-model.reducer';


export interface DigitalRelayState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  auth: fromAuth.State;
  teamModel: fromTeamModel.State;
}

export const reducers: ActionReducerMap<DigitalRelayState> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  teamModel: fromTeamModel.reducer
};


export const metaReducers: MetaReducer<DigitalRelayState>[] = !environment.production ? [] : [];

export const selectUser = (state: DigitalRelayState) => state.auth;
export const selectTeamsList = (state: DigitalRelayState) => state.teamModel;
