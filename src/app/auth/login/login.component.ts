import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {DigitalRelayState} from '../../store';
import {login} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidCredentials = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<DigitalRelayState>) {
    this.loginForm = this.fb.group({
      login: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.store.dispatch(login({email: this.loginForm.value.login.email, password: this.loginForm.value.login.password}));
  }
}
