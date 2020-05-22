import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Subscription} from 'rxjs';

export interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  tempo: string;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegisterFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RegisterFormComponent),
      multi: true
    }
  ]
})

export class RegisterFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
  formGroup: FormGroup;
  subscriptions: Subscription[] = [];

  constructor() {
    this.formGroup = new FormGroup({
      emailField: new FormControl('', [Validators.required, Validators.email]),
      nameField: new FormControl('', [Validators.required]),
      passwordField: new FormControl('', [Validators.required]),
      passwordConfirmField: new FormControl('', [Validators.required]),
      tempoMinutesField: new FormControl('', [Validators.required, Validators.min(0)]),
      tempoSecondsField: new FormControl('', [Validators.required, Validators.min(0), Validators.max(59)])
    }, {validators: passwordsMatchValidator});

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.formGroup.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get value(): RegisterFormValues {
    return this.formGroup.value;
  }

  set value(value: RegisterFormValues) {
    this.formGroup.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {
    if (this.formGroup.get(field).hasError('email')) {
      return 'Neplatný e-mail.';
    }
    if (this.formGroup.get(field).hasError('passwordsDontMatch')) {
      return 'Heslá sa nezhodujú.';
    }
    if (this.formGroup.get(field).hasError('required')) {
      return 'Toto pole je povinné.';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {
    // tslint:disable-next-line:semicolon
  };
  onTouched: any = () => {
    // tslint:disable-next-line:semicolon
  };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.formGroup.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.formGroup.valid ? null : {registration: {valid: false}};
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
