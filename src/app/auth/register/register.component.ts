import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthApiService} from '../auth-api.service';
import {login} from '../../store/actions/auth.actions';
import {Store} from '@ngrx/store';
import {DigitalRelayState} from '../../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: String | null;

  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private store: Store<DigitalRelayState>) {
    this.registerForm = this.formBuilder.group({
      registration: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.value);
    const email = this.registerForm.value.registration.emailField;
    const name = this.registerForm.value.registration.nameField;
    const password = this.registerForm.value.registration.passwordField;
    this.authApiService.register(email, name, password).toPromise().then(() => {
      this.store.dispatch(login({email: email, password: password}));
    }).catch((error) => {
      this.errorMessage = error.error.response.errors[Object.keys(error.error.response.errors)[0]][0];
    });
  }
}


