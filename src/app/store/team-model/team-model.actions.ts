import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {TeamModel} from './team-model.model';

export const loadTeamModels = createAction(
  '[TeamModel/API] Load TeamModels',
  props<{ teamModels: TeamModel[] }>()
);

export const addTeamModel = createAction(
  '[TeamModel/API] Add TeamModel',
  props<{ teamModel: TeamModel }>()
);

export const upsertTeamModel = createAction(
  '[TeamModel/API] Upsert TeamModel',
  props<{ teamModel: TeamModel }>()
);

export const addTeamModels = createAction(
  '[TeamModel/API] Add TeamModels',
  props<{ teamModels: TeamModel[] }>()
);

export const upsertTeamModels = createAction(
  '[TeamModel/API] Upsert TeamModels',
  props<{ teamModels: TeamModel[] }>()
);

export const updateTeamModel = createAction(
  '[TeamModel/API] Update TeamModel',
  props<{ teamModel: Update<TeamModel> }>()
);

export const updateTeamModels = createAction(
  '[TeamModel/API] Update TeamModels',
  props<{ teamModels: Update<TeamModel>[] }>()
);

export const deleteTeamModel = createAction(
  '[TeamModel/API] Delete TeamModel',
  props<{ id: string }>()
);

export const deleteTeamModels = createAction(
  '[TeamModel/API] Delete TeamModels',
  props<{ ids: string[] }>()
);

export const clearTeamModels = createAction(
  '[TeamModel/API] Clear TeamModels'
);
