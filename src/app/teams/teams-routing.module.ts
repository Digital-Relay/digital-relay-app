import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTeamComponent} from './create-team/create-team.component';
import {TeamPageComponent} from './team-page/team-page.component';
import {MyTeamsComponent} from './my-teams/my-teams.component';
import {AuthGuard} from '../auth/auth.guard';


const routes: Routes = [
  {path: 'create', component: CreateTeamComponent, canActivate: [AuthGuard]},
  {path: 'my', component: MyTeamsComponent, canActivate: [AuthGuard]},
  {path: ':id', component: TeamPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {
}
