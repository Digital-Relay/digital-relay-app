import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../../store';
import {login} from '../../store/actions/auth.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {State} from '../../store/reducers/auth.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  invalidCredentials = false;
  errorMessage: string | null;
  state: Observable<State>;
  inProgress: boolean;
  loginSub: Subscription;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<DigitalRelayState>,
    private router: Router,
    private readonly route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      login: []
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.state = store.select(selectUser);
    this.loginSub = this.state.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.inProgress = false;
      if (state.isLoggedIn) {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.emailConfirmed) {
        this.snackBar.open('E-mailová adresa úspešne overená.', 'OK', {duration: 5000});
      }
      if (params.passwordChanged) {
        this.snackBar.open('Heslo bolo úspešne zmenené.', 'OK', {duration: 5000});
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  onSubmit() {
    this.inProgress = true;
    this.store.dispatch(login({
      email: this.loginForm.value.login.email,
      password: this.loginForm.value.login.password
    }));
  }
}
