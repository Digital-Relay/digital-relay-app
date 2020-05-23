import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {DigitalRelayState} from '../../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<DigitalRelayState>) {
    this.registerForm = this.formBuilder.group({
      registration: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}


