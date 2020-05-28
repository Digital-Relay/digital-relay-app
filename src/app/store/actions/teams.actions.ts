import {createAction, props} from '@ngrx/store';
import {ErrorResponse} from '../../api/models/error-response';
import {Stage, TeamsList} from '../../api/models';
import {TeamModel} from '../team-model/team-model.model';

export const load = createAction(
  '[Teams] Load teams',
  props<any>()
);

export const loadSuccess = createAction(
  '[Teams] Load success',
  props<TeamsList>()
);

export const loadFailure = createAction(
  '[Teams] Load failure',
  props<ErrorResponse>()
);

export const create = createAction(
  '[Teams] Create new team',
  props<TeamModel>()
);

export const updateStages = createAction(
  '[Teams] Update team stages',
  props<{ teamId: string, stages: Stage[] }>()
);
