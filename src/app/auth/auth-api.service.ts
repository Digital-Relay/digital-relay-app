import {Injectable} from '@angular/core';
import {AuthService} from '../api/services/auth.service';
import {LoginRequest} from '../api/models/login-request';
import {RegisterRequest} from '../api/models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private api: AuthService) {
  }

  login(email: string, password: string) {
    return this.api.postLogin({email, password} as LoginRequest).toPromise().then((jwt) => {
      this.storeToken(jwt.access_token);
      console.log(jwt);
    });
  }

  register(email: string, name: string, password: string) {
    return this.api.postRegister({email, name, password} as RegisterRequest)
  }

  // noinspection JSMethodCanBeStatic
  private storeToken(token) {
    localStorage.setItem('digital_relay_access_token', token);
  }

}
