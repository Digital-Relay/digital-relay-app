/* tslint:disable */
import {RegistrationErrorKeys} from './registration-error-keys';
import {UserModel} from './user-model';

export interface RegistrationResponseBody {
  csrf_token?: string;
  errors?: RegistrationErrorKeys;
  user?: UserModel;
}
