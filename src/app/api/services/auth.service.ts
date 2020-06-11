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
import {PushSubscription} from '../models/push-subscription';
import {VAPIDKey} from '../models/vapidkey';
import {RegistrationResponse} from '../models/registration-response';
import {RegisterRequest} from '../models/register-request';
import {PasswordResetRequest} from '../models/password-reset-request';

/**
 * Security endpoints
 */
@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly postLoginPath = '/auth';
  static readonly getHelloWorldPath = '/auth/hello';
  static readonly postPushResourcePath = '/auth/push';
  static readonly getPushResourcePath = '/auth/push';
  static readonly getTokenRefreshPath = '/auth/refresh_token';
  static readonly postRegisterPath = '/auth/register';
  static readonly postResetPath = '/auth/reset';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Login as existing user
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
   * Login as existing user
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
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
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
   * Add new push subscription to current user
   * @param params The `AuthService.PostPushResourceParams` containing the following parameters:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   */
  postPushResourceResponse(params: AuthService.PostPushResourceParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.payload;
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/push`,
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
   * Add new push subscription to current user
   * @param params The `AuthService.PostPushResourceParams` containing the following parameters:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   */
  postPushResource(params: AuthService.PostPushResourceParams): __Observable<null> {
    return this.postPushResourceResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get VAPID public key
   * @return OK
   */
  getPushResourceResponse(): __Observable<__StrictHttpResponse<VAPIDKey>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/push`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VAPIDKey>;
      })
    );
  }

  /**
   * Get VAPID public key
   * @return OK
   */
  getPushResource(): __Observable<VAPIDKey> {
    return this.getPushResourceResponse().pipe(
      __map(_r => _r.body as VAPIDKey)
    );
  }

  /**
   * Get a new access token
   * @param Authorization JWT refresh token, format: JWT <refresh_token>
   * @return Token refresh successful
   */
  getTokenRefreshResponse(Authorization: string): __Observable<__StrictHttpResponse<JWTResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/refresh_token`,
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
   * Get a new access token
   * @param Authorization JWT refresh token, format: JWT <refresh_token>
   * @return Token refresh successful
   */
  getTokenRefresh(Authorization: string): __Observable<JWTResponse> {
    return this.getTokenRefreshResponse(Authorization).pipe(
      __map(_r => _r.body as JWTResponse)
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

  /**
   * Request user password reset
   * @param payload undefined
   * @return Registration successful
   */
  postResetResponse(payload: PasswordResetRequest): __Observable<__StrictHttpResponse<RegistrationResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = payload;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/reset`,
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
   * Request user password reset
   * @param payload undefined
   * @return Registration successful
   */
  postReset(payload: PasswordResetRequest): __Observable<RegistrationResponse> {
    return this.postResetResponse(payload).pipe(
      __map(_r => _r.body as RegistrationResponse)
    );
  }
}

module AuthService {

  /**
   * Parameters for postPushResource
   */
  export interface PostPushResourceParams {
    payload: PushSubscription;

    /**
     * JWT auth token, format: JWT <access_token>
     */
    Authorization: string;
  }
}

export { AuthService }
