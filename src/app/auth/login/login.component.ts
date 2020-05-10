import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailField = new FormControl('', [Validators.required, Validators.email]);
  passwordField = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.emailField.hasError('required') || this.passwordField.hasError('required')) {
      return 'Toto pole je povinné.';
    }
    return this.emailField.hasError('email') ? 'Neplatný e-mail.' : '';
  }

}
