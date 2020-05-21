import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTeamComponent} from './create-team/create-team.component';
import {TeamPageComponent} from './team-page/team-page.component';
import {MyTeamsComponent} from './my-teams/my-teams.component';


const routes: Routes = [
  {path: 'create', component: CreateTeamComponent},
  {path: 'team', component: TeamPageComponent},
  {path: 'my', component: MyTeamsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {
}
