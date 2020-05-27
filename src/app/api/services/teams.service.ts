/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {BaseService as __BaseService} from '../base-service';
import {ApiConfiguration as __Configuration} from '../api-configuration';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';
import {Observable as __Observable} from 'rxjs';
import {filter as __filter, map as __map} from 'rxjs/operators';

import {TeamsList} from '../models/teams-list';
import {Team} from '../models/team';
import {EditStagesRequest} from '../models/edit-stages-request';
import {UserList} from '../models/user-list';
import {AddMembersRequest} from '../models/add-members-request';

/**
 * Team management endpoints
 */
@Injectable({
  providedIn: 'root',
})
class TeamsService extends __BaseService {
  static readonly getTeamsPath = '/teams';
  static readonly postTeamsPath = '/teams';
  static readonly getTeamResourcePath = '/teams/{team_id}';
  static readonly postTeamResourcePath = '/teams/{team_id}';
  static readonly postStagesPath = '/teams/{team_id}/stages';
  static readonly getTeamMembersPath = '/teams/{team_id}/users';
  static readonly postTeamMembersPath = '/teams/{team_id}/users';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
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
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
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
   * Create a new team
   * @param params The `TeamsService.PostTeamsParams` containing the following parameters:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return Team creation successful
   */
  postTeamsResponse(params: TeamsService.PostTeamsParams): __Observable<__StrictHttpResponse<Team>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.payload;
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
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
        return _r as __StrictHttpResponse<Team>;
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
  postTeams(params: TeamsService.PostTeamsParams): __Observable<Team> {
    return this.postTeamsResponse(params).pipe(
      __map(_r => _r.body as Team)
    );
  }

  /**
   * Retrieve team information
   * @param team_id undefined
   * @return OK
   */
  getTeamResourceResponse(teamId: string): __Observable<__StrictHttpResponse<Team>> {
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
        return _r as __StrictHttpResponse<Team>;
      })
    );
  }
  /**
   * Retrieve team information
   * @param team_id undefined
   * @return OK
   */
  getTeamResource(teamId: string): __Observable<Team> {
    return this.getTeamResourceResponse(teamId).pipe(
      __map(_r => _r.body as Team)
    );
  }

  /**
   * Update team information
   * @param params The `TeamsService.PostTeamResourceParams` containing the following parameters:
   *
   * - `team_id`:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return Team update successful
   */
  postTeamResourceResponse(params: TeamsService.PostTeamResourceParams): __Observable<__StrictHttpResponse<Team>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.payload;
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/teams/${encodeURIComponent(params.teamId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Team>;
      })
    );
  }
  /**
   * Update team information
   * @param params The `TeamsService.PostTeamResourceParams` containing the following parameters:
   *
   * - `team_id`:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return Team update successful
   */
  postTeamResource(params: TeamsService.PostTeamResourceParams): __Observable<Team> {
    return this.postTeamResourceResponse(params).pipe(
      __map(_r => _r.body as Team)
    );
  }

  /**
   * Edit stages assignment
   * @param params The `TeamsService.PostStagesParams` containing the following parameters:
   *
   * - `team_id`:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   */
  postStagesResponse(params: TeamsService.PostStagesParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.payload;
    if (params.Authorization != null) {
      __headers = __headers.set('Authorization', params.Authorization.toString());
    }
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/teams/${encodeURIComponent(params.teamId)}/stages`,
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
   * Edit stages assignment
   * @param params The `TeamsService.PostStagesParams` containing the following parameters:
   *
   * - `team_id`:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   */
  postStages(params: TeamsService.PostStagesParams): __Observable<null> {
    return this.postStagesResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieve team members as user objects
   * @param team_id undefined
   * @return OK
   */
  getTeamMembersResponse(teamId: string): __Observable<__StrictHttpResponse<UserList>> {
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
        return _r as __StrictHttpResponse<UserList>;
      })
    );
  }

  /**
   * Retrieve team members as user objects
   * @param team_id undefined
   * @return OK
   */
  getTeamMembers(teamId: string): __Observable<UserList> {
    return this.getTeamMembersResponse(teamId).pipe(
      __map(_r => _r.body as UserList)
    );
  }

  /**
   * Add users to team
   *
   * Add new members to the team and send them e-mail invites
   * @param params The `TeamsService.PostTeamMembersParams` containing the following parameters:
   *
   * - `team_id`:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return OK
   */
  postTeamMembersResponse(params: TeamsService.PostTeamMembersParams): __Observable<__StrictHttpResponse<UserList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.payload;
    if (params.Authorization != null) {
      __headers = __headers.set('Authorization', params.Authorization.toString());
    }
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/teams/${encodeURIComponent(params.teamId)}/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserList>;
      })
    );
  }

  /**
   * Add users to team
   *
   * Add new members to the team and send them e-mail invites
   * @param params The `TeamsService.PostTeamMembersParams` containing the following parameters:
   *
   * - `team_id`:
   *
   * - `payload`:
   *
   * - `Authorization`: JWT auth token, format: JWT <access_token>
   *
   * @return OK
   */
  postTeamMembers(params: TeamsService.PostTeamMembersParams): __Observable<UserList> {
    return this.postTeamMembersResponse(params).pipe(
      __map(_r => _r.body as UserList)
    );
  }
}

module TeamsService {

  /**
   * Parameters for postTeams
   */
  export interface PostTeamsParams {
    payload: Team;

    /**
     * JWT auth token, format: JWT <access_token>
     */
    Authorization: string;
  }

  /**
   * Parameters for postTeamResource
   */
  export interface PostTeamResourceParams {
    teamId: string;
    payload: Team;

    /**
     * JWT auth token, format: JWT <access_token>
     */
    Authorization: string;
  }

  /**
   * Parameters for postStages
   */
  export interface PostStagesParams {
    teamId: string;
    payload: EditStagesRequest;

    /**
     * JWT auth token, format: JWT <access_token>
     */
    Authorization: string;
  }

  /**
   * Parameters for postTeamMembers
   */
  export interface PostTeamMembersParams {
    teamId: string;
    payload: AddMembersRequest;

    /**
     * JWT auth token, format: JWT <access_token>
     */
    Authorization: string;
  }
}

export {TeamsService};
