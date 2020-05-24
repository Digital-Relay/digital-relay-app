import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthApiService} from '../auth-api.service';
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private snackBar: MatSnackBar) {
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
    const minutes: number = this.registerForm.value.registration.tempoMinutesField;
    const seconds: number = this.registerForm.value.registration.tempoSecondsField;
    this.authApiService.register(email, name, password, minutes * 60 + seconds).toPromise().then(() => {
      this.snackBar.open('Registrácia prebehla úspešne. Poslali sme vám potvrdzovací e-mail s ďalším postupom.', 'OK');
    }).catch((error) => {
      this.errorMessage = error.error.response.errors[Object.keys(error.error.response.errors)[0]][0];
    });
  }
}


