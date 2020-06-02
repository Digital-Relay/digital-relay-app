/* tslint:disable */
import {Stage} from './stage';

export interface Team {
  donation?: number;
  id?: string;
  members: Array<string>;
  name: string;
  stages?: Array<Stage>;

  /**
   * Team's starting time of day, in seconds since midnight
   */
  start?: number;
}
