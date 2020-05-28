/* tslint:disable */
export interface RegisterRequest {
  email: string;
  name: string;
  password: string;

  /**
   * Runners tempo, in secs/km
   */
  tempo: number;
}
