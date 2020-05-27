import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthApiService} from '../auth-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null;
  inProgress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      registration: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.inProgress = true;
    const email = this.registerForm.value.registration.emailField;
    const name = this.registerForm.value.registration.nameField;
    const password = this.registerForm.value.registration.passwordField;
    const minutes: number = this.registerForm.value.registration.tempoMinutesField;
    const seconds: number = this.registerForm.value.registration.tempoSecondsField;
    this.authApiService.register(email, name, password, minutes * 60 + seconds).toPromise().then(() => {
      this.errorMessage = null;
      this.inProgress = false;
      const snackBarRef = this.snackBar.open('Registrácia prebehla úspešne. Poslali sme vám potvrdzovací e-mail s ďalším postupom.', 'OK');
      snackBarRef.onAction().subscribe(() => this.router.navigate(['/']));
    }).catch((error) => {
      this.inProgress = false;
      this.errorMessage = error.error.response.errors[Object.keys(error.error.response.errors)[0]][0];
    });
  }
}


