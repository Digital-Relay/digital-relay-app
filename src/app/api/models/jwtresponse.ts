/* tslint:disable */
import {User} from './user';

export interface JWTResponse {
  access_token: string;
  expires_at: number;
  refresh_token?: string;
  user?: User;
}
