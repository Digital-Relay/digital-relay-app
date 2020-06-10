import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AuthGuard} from './auth.guard';
import {PasswordResetComponent} from "./password-reset/password-reset.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
