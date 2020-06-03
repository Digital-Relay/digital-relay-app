import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {StageModel} from './stage-model.model';

export const loadStageModels = createAction(
  '[StageModel/API] Load StageModels',
  props<{ stageModels: StageModel[] }>()
);

export const addStageModel = createAction(
  '[StageModel/API] Add StageModel',
  props<{ stageModel: StageModel }>()
);

export const upsertStageModel = createAction(
  '[StageModel/API] Upsert StageModel',
  props<{ stageModel: StageModel }>()
);

export const addStageModels = createAction(
  '[StageModel/API] Add StageModels',
  props<{ stageModels: StageModel[] }>()
);

export const upsertStageModels = createAction(
  '[StageModel/API] Upsert StageModels',
  props<{ stageModels: StageModel[] }>()
);

export const updateStageModel = createAction(
  '[StageModel/API] Update StageModel',
  props<{ stageModel: Update<StageModel> }>()
);

export const updateStageModels = createAction(
  '[StageModel/API] Update StageModels',
  props<{ stageModels: Update<StageModel>[] }>()
);

export const deleteStageModel = createAction(
  '[StageModel/API] Delete StageModel',
  props<{ id: string }>()
);

export const deleteStageModels = createAction(
  '[StageModel/API] Delete StageModels',
  props<{ ids: string[] }>()
);

export const clearStageModels = createAction(
  '[StageModel/API] Clear StageModels'
);
