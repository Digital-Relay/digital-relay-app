import {StageModel} from '../stage-model/stage-model.model';

export interface TeamModel {
  id: string;
  members: Array<string>;
  name: string;
  donation: number;
  stages_completed: number;
  average_tempo: number;
  start: number;
  stages: StageModel[];
}
