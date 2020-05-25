import {createAction, props} from '@ngrx/store';
import {ErrorResponse} from '../../api/models/error-response';
import {TeamsList} from "../../api/models";
import {TeamModel} from "../team-model/team-model.model";

export const load = createAction(
  '[Load] Load teams',
  props<any>()
);

export const loadSuccess = createAction(
  '[Load] Load success',
  props<TeamsList>()
);

export const loadFailure = createAction(
  '[Load] Load failure',
  props<ErrorResponse>()
);

export const create = createAction(
  '[Create] Create new team',
  props<TeamModel>()
);
