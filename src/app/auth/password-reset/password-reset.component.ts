import {Component, OnInit} from '@angular/core';
import {AuthApiService} from "../auth-api.service";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, Validators} from "@angular/forms";
import {maxLengths} from "../../globals";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  inProgress: boolean;
  errorMessage: string;
  email = new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(maxLengths.email)]);

  constructor(private authApiService: AuthApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authApiService.passwordReset(this.email.value).pipe(
      map(() => {
        this.errorMessage = "";
        this.snackBar.open('Link na obnovenie hesla bola poslaná na e-mail.', 'OK');
      }),
      catchError((error) => {
        this.errorMessage = error.error.response.errors.email[0];
        this.inProgress = false
        return of();
      })).subscribe(() => this.inProgress = false);
    this.inProgress = true;
  }
}
