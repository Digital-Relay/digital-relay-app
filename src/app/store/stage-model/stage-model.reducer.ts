import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {StageModel} from './stage-model.model';
import * as StageModelActions from './stage-model.actions';

export const stageModelsFeatureKey = 'stageModels';

export interface State extends EntityState<StageModel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<StageModel> = createEntityAdapter<StageModel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(StageModelActions.addStageModel,
    (state, action) => adapter.addOne(action.stageModel, state)
  ),
  on(StageModelActions.upsertStageModel,
    (state, action) => adapter.upsertOne(action.stageModel, state)
  ),
  on(StageModelActions.addStageModels,
    (state, action) => adapter.addMany(action.stageModels, state)
  ),
  on(StageModelActions.upsertStageModels,
    (state, action) => adapter.upsertMany(action.stageModels, state)
  ),
  on(StageModelActions.updateStageModel,
    (state, action) => adapter.updateOne(action.stageModel, state)
  ),
  on(StageModelActions.updateStageModels,
    (state, action) => adapter.updateMany(action.stageModels, state)
  ),
  on(StageModelActions.deleteStageModel,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(StageModelActions.deleteStageModels,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(StageModelActions.loadStageModels,
    (state, action) => adapter.setAll(action.stageModels, state)
  ),
  on(StageModelActions.clearStageModels,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
