import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../../store';
import {login} from '../../store/actions/auth.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {State} from '../../store/reducers/auth.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidCredentials = false;
  errorMessage: string | null;
  state: Observable<State>;

  constructor(
    private fb: FormBuilder,
    private store: Store<DigitalRelayState>,
    private router: Router,
    private readonly route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      login: []
    });
    this.state = store.select(selectUser);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.emailConfirmed) {
        this.snackBar.open('E-mailová adresa úspešne overená.', 'OK', {duration: 5000});
      }
    });
    this.state.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      if (state.isLoggedIn) {
        this.router.navigate(['teams', 'my']);
      }
    });
  }

  onSubmit() {
    this.store.dispatch(login({
      email: this.loginForm.value.login.email,
      password: this.loginForm.value.login.password
    }));
  }
}
