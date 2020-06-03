import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamsRoutingModule} from './teams-routing.module';
import {CreateTeamComponent} from './create-team/create-team.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {AuthModule} from '../auth/auth.module';
import {MatTabsModule} from '@angular/material/tabs';
import {TeamPageComponent} from './team-page/team-page.component';
import {MemberComponent} from './member/member.component';
import {MapToArray, MyTeamsComponent} from './my-teams/my-teams.component';
import {TeamComponent} from './team/team.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MemberListComponent} from './member-list/member-list.component';
import {StageListComponent} from './stage-list/stage-list.component';
import {StageComponent} from './stage/stage.component';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditTeamComponent} from './edit-team/edit-team.component';
import {MatTableModule} from '@angular/material/table';
import {TempoDialogComponent} from './tempo-dialog/tempo-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [CreateTeamComponent, TeamPageComponent, MemberComponent,
    MyTeamsComponent, TeamComponent, MemberListComponent, StageListComponent,
    StageComponent, MapToArray, EditTeamComponent, TempoDialogComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatDividerModule,
    AuthModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class TeamsModule {
}
