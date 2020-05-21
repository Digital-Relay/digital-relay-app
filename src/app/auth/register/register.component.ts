import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthApiService} from '../auth-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private readonly router: Router) {
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
    this.authApiService.register(email, name, password).then(() => {
      console.log('registration successful');
      this.authApiService.login(email, password);
      this.router.navigate(['teams', 'my']);
    }).catch(() => {
      console.log('registration failed');
    });
  }
}


