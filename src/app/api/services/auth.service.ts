/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {BaseService as __BaseService} from '../base-service';
import {ApiConfiguration as __Configuration} from '../api-configuration';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';
import {Observable as __Observable} from 'rxjs';
import {filter as __filter, map as __map} from 'rxjs/operators';

import {JWTResponse} from '../models/jwtresponse';
import {LoginRequest} from '../models/login-request';
import {RegistrationResponse} from '../models/registration-response';
import {RegisterRequest} from '../models/register-request';

/**
 * Security endpoints
 */
@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly postLoginPath = '/auth';
  static readonly getHelloWorldPath = '/auth/hello';
  static readonly postRegisterPath = '/auth/register';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Log in as an existing user
   * @param payload undefined
   * @return Login successful
   */
  postLoginResponse(payload: LoginRequest): __Observable<__StrictHttpResponse<JWTResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = payload;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JWTResponse>;
      })
    );
  }

  /**
   * Log in as an existing user
   * @param payload undefined
   * @return Login successful
   */
  postLogin(payload: LoginRequest): __Observable<JWTResponse> {
    return this.postLoginResponse(payload).pipe(
      __map(_r => _r.body as JWTResponse)
    );
  }

  /**
   * @param Authorization JWT auth token, format: JWT <access_token>
   */
  getHelloWorldResponse(Authorization: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) {
      __headers = __headers.set('Authorization', Authorization.toString());
    }
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/hello`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }

  /**
   * @param Authorization JWT auth token, format: JWT <access_token>
   */
  getHelloWorld(Authorization: string): __Observable<null> {
    return this.getHelloWorldResponse(Authorization).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Register a new user
   * @param payload undefined
   * @return Registration successful
   */
  postRegisterResponse(payload: RegisterRequest): __Observable<__StrictHttpResponse<RegistrationResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = payload;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegistrationResponse>;
      })
    );
  }

  /**
   * Register a new user
   * @param payload undefined
   * @return Registration successful
   */
  postRegister(payload: RegisterRequest): __Observable<RegistrationResponse> {
    return this.postRegisterResponse(payload).pipe(
      __map(_r => _r.body as RegistrationResponse)
    );
  }
}

module AuthService {
}

export {AuthService};