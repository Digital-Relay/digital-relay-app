import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TeamModel} from './team-model.model';
import * as TeamModelActions from './team-model.actions';
import {load, loadFailure, loadSuccess} from "../actions/teams.actions";

export const teamModelsFeatureKey = 'teamModels';

export interface State extends EntityState<TeamModel> {
  loading: boolean,
  errorMessage: string
}

export const adapter: EntityAdapter<TeamModel> = createEntityAdapter<TeamModel>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  errorMessage: ""
});


export const reducer = createReducer(
  initialState,
  on(TeamModelActions.addTeamModel,
    (state, action) => adapter.addOne(action.teamModel, state)
  ),
  on(TeamModelActions.upsertTeamModel,
    (state, action) => adapter.upsertOne(action.teamModel, state)
  ),
  on(TeamModelActions.addTeamModels,
    (state, action) => adapter.addMany(action.teamModels, state)
  ),
  on(TeamModelActions.upsertTeamModels,
    (state, action) => adapter.upsertMany(action.teamModels, state)
  ),
  on(TeamModelActions.updateTeamModel,
    (state, action) => adapter.updateOne(action.teamModel, state)
  ),
  on(TeamModelActions.updateTeamModels,
    (state, action) => adapter.updateMany(action.teamModels, state)
  ),
  on(TeamModelActions.deleteTeamModel,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TeamModelActions.deleteTeamModels,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TeamModelActions.loadTeamModels,
    (state, action) => adapter.setAll(action.teamModels, state)
  ),
  on(TeamModelActions.clearTeamModels,
    state => adapter.removeAll(state)
  ),
  on(load, ((state) => ({...state, loading: true, errorMessage: ""}))),
  on(loadSuccess, ((state) => ({...state, loading: false, errorMessage: ""}))),
  on(loadFailure, ((state, action) => ({...state, loading: false, errorMessage: action.msg}))),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
