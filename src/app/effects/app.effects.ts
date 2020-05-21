import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {AuthService} from '../api/services/auth.service';
import {TeamsService} from '../api/services/teams.service';


@Injectable()
export class AppEffects {

  // init$ = createEffect(() => this.actions$.pipe(
  //   ofType(ROOT_EFFECTS_INIT),
  //   mergeMap(_ => this.teamApi.getTeams('JWT ' + localStorage.getItem('digital_relay_access_token'))),
  //   map(teams => loadTeamModels({teamModels: teams.teams as TeamModel[]}))));

  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Login Form] Login'),
  //   mergeMap((action: any) => {
  //     return this.authApi.postLogin({email: action.email, password: action.password} as LoginRequest);
  //   }),
  //   map(jwt_response => )
  // ))

  // noinspection JSUnusedLocalSymbols
  constructor(private actions$: Actions, private authApi: AuthService, private teamApi: TeamsService) {
  }

}
