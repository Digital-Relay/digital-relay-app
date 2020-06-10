import {Injectable} from '@angular/core';
import {AuthService} from '../api/services/auth.service';
import {LoginRequest} from '../api/models/login-request';
import {RegisterRequest} from '../api/models/register-request';
import {PasswordResetRequest} from "../api/models/password-reset-request";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private api: AuthService) {
  }

  login(email: string, password: string) {
    return this.api.postLogin({email, password} as LoginRequest).toPromise().then((jwt) => {
      this.storeToken(jwt.access_token);
    });
  }

  register(email: string, name: string, password: string, tempo: number) {
    return this.api.postRegister({email, name, password, tempo} as RegisterRequest);
  }

  passwordReset(email: string) {
    return this.api.postReset({email: email} as PasswordResetRequest);
  }

  // noinspection JSMethodCanBeStatic
  private storeToken(token) {
    localStorage.setItem('digital_relay_access_token', token);
  }

}
