/* tslint:disable */
import {User} from './user';

export interface JWTResponse {
  access_token: string;
  expires_at: string;
  refresh_token?: string;
  user?: User;
}
