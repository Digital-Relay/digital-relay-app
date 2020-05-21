/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {BaseService as __BaseService} from '../base-service';
import {ApiConfiguration as __Configuration} from '../api-configuration';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';
import {Observable as __Observable} from 'rxjs';
import {filter as __filter, map as __map} from 'rxjs/operators';

import {TeamModel} from '../models/team-model';
import {TeamsList} from '../models/teams-list';

/**
 * Team management endpoints
 */
@Injectable({
  providedIn: 'root',
})
class TeamsService extends __BaseService {
  static readonly postTeamsPath = '/teams';
  static readonly getTeamsPath = '/teams';
  static readonly getTeamResourcePath = '/teams/{team_id}';
  static readonly getTeamMembersPath = '/teams/{team_id}/users';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Create a new team
   * @param params The `TeamsService.PostTeamsParams` containing the following parameters:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return Team creation successful
   */
  postTeamsResponse(params: TeamsService.PostTeamsParams): __Observable<__StrictHttpResponse<TeamModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.payload;
    if (params.Authorization != null) {
      __headers = __headers.set('Authorization', params.Authorization.toString());
    }
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/teams`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TeamModel>;
      })
    );
  }

  /**
   * Create a new team
   * @param params The `TeamsService.PostTeamsParams` containing the following parameters:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return Team creation successful
   */
  postTeams(params: TeamsService.PostTeamsParams): __Observable<TeamModel> {
    return this.postTeamsResponse(params).pipe(
      __map(_r => _r.body as TeamModel)
    );
  }

  /**
   * Retrieve all teams that the current user belongs to
   * @param Authorization JWT auth token, format: JWT <access_token>
   * @return OK
   */
  getTeamsResponse(Authorization: string): __Observable<__StrictHttpResponse<TeamsList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) {
      __headers = __headers.set('Authorization', Authorization.toString());
    }
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/teams`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TeamsList>;
      })
    );
  }

  /**
   * Retrieve all teams that the current user belongs to
   * @param Authorization JWT auth token, format: JWT <access_token>
   * @return OK
   */
  getTeams(Authorization: string): __Observable<TeamsList> {
    return this.getTeamsResponse(Authorization).pipe(
      __map(_r => _r.body as TeamsList)
    );
  }

  /**
   * Retrieve team information
   * @param team_id undefined
   * @return OK
   */
  getTeamResourceResponse(teamId: string): __Observable<__StrictHttpResponse<TeamModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/teams/${encodeURIComponent(teamId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TeamModel>;
      })
    );
  }

  /**
   * Retrieve team information
   * @param team_id undefined
   * @return OK
   */
  getTeamResource(teamId: string): __Observable<TeamModel> {
    return this.getTeamResourceResponse(teamId).pipe(
      __map(_r => _r.body as TeamModel)
    );
  }

  /**
   * Retrieve team members as user objects
   * @param team_id undefined
   * @return OK
   */
  getTeamMembersResponse(teamId: string): __Observable<__StrictHttpResponse<TeamModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/teams/${encodeURIComponent(teamId)}/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TeamModel>;
      })
    );
  }

  /**
   * Retrieve team members as user objects
   * @param team_id undefined
   * @return OK
   */
  getTeamMembers(teamId: string): __Observable<TeamModel> {
    return this.getTeamMembersResponse(teamId).pipe(
      __map(_r => _r.body as TeamModel)
    );
  }
}

module TeamsService {

  /**
   * Parameters for postTeams
   */
  export interface PostTeamsParams {
    payload: TeamModel;

    /**
     * JWT auth token, format: JWT <access_token>
     */
    Authorization: string;
  }
}

export {TeamsService};
