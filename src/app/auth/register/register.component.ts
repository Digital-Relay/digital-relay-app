import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup = new FormGroup({
    emailField: new FormControl('', [Validators.required, Validators.email]),
    passwordField: new FormControl('', [Validators.required]),
    passwordConfirmField: new FormControl('', [Validators.required])
  }, {validators: passwordsMatchValidator});


  constructor() {
  }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {
    if (this.formGroup.get(field).hasError('email')) {
      return 'Neplatný email.';
    }
    if (this.formGroup.get(field).hasError('passwordsDontMatch')) {
      return 'Heslá sa nezhodujú.';
    }
    if (this.formGroup.get(field).hasError('required')) {
      return 'Toto pole je povinné.';
    }
  }

  onSubmit() {

  }
}

export const passwordsMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  if (control.get('passwordField').value !== control.get('passwordConfirmField').value) {
    control.get('passwordConfirmField').setErrors({passwordsDontMatch: true});
    return {passwordsDontMatch: true};
  } else {
    try {
      delete control.get('passwordConfirmField').errors.passwordsDontMatch;
    } catch {
    }
  }
};
