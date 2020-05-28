import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {errorMessages} from '../../globals';

export interface LoginFormValues {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LoginFormComponent),
      multi: true
    }
  ]
})
export class LoginFormComponent implements OnInit, ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get value(): LoginFormValues {
    return this.form.value;
  }

  set value(value: LoginFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {
    return errorMessages(this.form.get(field));
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
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.form.valid ? null : {login: {valid: false}};
  }
}
