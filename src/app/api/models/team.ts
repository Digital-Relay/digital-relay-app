/* tslint:disable */
import {Stage} from './stage';

export interface Team {

  /**
   * Average tempo for so far completed stages
   */
  average_tempo?: number;
  donation?: number;
  id?: string;
  members: Array<string>;
  name: string;
  stages?: Array<Stage>;
  stages_completed?: number;

  /**
   * Team's starting time of day, in seconds since midnight
   */
  start?: number;
}
