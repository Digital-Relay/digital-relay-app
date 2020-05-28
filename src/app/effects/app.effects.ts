import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {AuthService} from '../api/services/auth.service';
import {TeamsService} from '../api/services/teams.service';


@Injectable()
export class AppEffects {

  // noinspection JSUnusedLocalSymbols
  constructor(private actions$: Actions, private authApi: AuthService, private teamApi: TeamsService) {
  }

}
