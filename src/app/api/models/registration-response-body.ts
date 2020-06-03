/* tslint:disable */
import { RegistrationErrorKeys } from './registration-error-keys';
import { User } from './user';
export interface RegistrationResponseBody {
  csrf_token?: string;
  errors?: RegistrationErrorKeys;
  user?: User;
}
