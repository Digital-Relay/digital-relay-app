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


@NgModule({
  declarations: [CreateTeamComponent],
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
    MatTabsModule
  ]
})
export class TeamsModule {
}
