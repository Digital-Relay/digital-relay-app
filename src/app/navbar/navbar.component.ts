import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../store';
import {State} from '../store/reducers/auth.reducer';
import {UserModel} from '../store/user-model/user-model.model';
import {logout} from '../store/actions/auth.actions';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  state: Observable<State>;
  isLoggedIn: boolean;
  user: UserModel;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private store: Store<DigitalRelayState>) {
    this.state = store.select(selectUser);
    iconRegistry.addSvgIcon(
      'relay',
      sanitizer.bypassSecurityTrustResourceUrl('assets/run-circle-dxc.svg'));
  }

  ngOnInit(): void {
    this.state.subscribe(state => {
      this.isLoggedIn = state.isLoggedIn;
      this.user = state.user;
    });
  }

  logout() {
    this.store.dispatch(logout({}));
  }

  dryRun() {
    return environment.dryRun;
  }
}
