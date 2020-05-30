import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../store';
import {State} from '../store/reducers/auth.reducer';
import {UserModel} from '../store/user-model/user-model.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state: Observable<State>;
  isLoggedIn: boolean;
  user: UserModel;

  constructor(store: Store<DigitalRelayState>, private route: ActivatedRoute) {
    this.state = store.select(selectUser);
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      try {
        this.scroll(document.querySelector(`#${fragment}`));
      } catch (e) {
      }
    });
    this.state.subscribe(state => {
      this.isLoggedIn = state.isLoggedIn;
      this.user = state.user;
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
