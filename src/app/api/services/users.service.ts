/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {BaseService as __BaseService} from '../base-service';
import {ApiConfiguration as __Configuration} from '../api-configuration';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';
import {Observable as __Observable} from 'rxjs';
import {filter as __filter, map as __map} from 'rxjs/operators';

import {User} from '../models/user';

/**
 * User management endpoints
 */
@Injectable({
  providedIn: 'root',
})
class UsersService extends __BaseService {
  static readonly getUserResourcePath = '/users';
  static readonly postUserResourcePath = '/users';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Retrieve current user's info
   * @param Authorization JWT auth token, format: JWT <access_token>
   * @return OK
   */
  getUserResourceResponse(Authorization: string): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) {
      __headers = __headers.set('Authorization', Authorization.toString());
    }
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Retrieve current user's info
   * @param Authorization JWT auth token, format: JWT <access_token>
   * @return OK
   */
  getUserResource(Authorization: string): __Observable<User> {
    return this.getUserResourceResponse(Authorization).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * Update current user's info
   * @param params The `UsersService.PostUserResourceParams` containing the following parameters:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return OK
   */
  postUserResourceResponse(params: UsersService.PostUserResourceParams): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.payload;
    if (params.Authorization != null) {
      __headers = __headers.set('Authorization', params.Authorization.toString());
    }
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Update current user's info
   * @param params The `UsersService.PostUserResourceParams` containing the following parameters:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return OK
   */
  postUserResource(params: UsersService.PostUserResourceParams): __Observable<User> {
    return this.postUserResourceResponse(params).pipe(
      __map(_r => _r.body as User)
    );
  }
}

module UsersService {

  /**
   * Parameters for postUserResource
   */
  export interface PostUserResourceParams {
    payload: User;

    /**
     * JWT auth token, format: JWT <access_token>
     */
    Authorization: string;
  }
}

export {UsersService};
