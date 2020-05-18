import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamsRoutingModule} from './teams-routing.module';
import {CreateTeamComponent} from './create-team/create-team.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CreateTeamComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule {
}
