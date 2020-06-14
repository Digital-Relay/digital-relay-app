import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SwPush} from '@angular/service-worker';
import {Store} from '@ngrx/store';
import {DigitalRelayState} from './store';
import {loadOne} from './store/actions/teams.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DXC RUN 4U';

  constructor(public router: Router, private swPush: SwPush, private state: Store<DigitalRelayState>) {
    this.swPush.notificationClicks.subscribe(click => {
      console.log(click);
      if (click.notification.data.teamId) {
        this.state.dispatch(loadOne({id: click.notification.data.teamId}));
        if (click.action === 'relay') {
          console.log('Accept relay');
        }

        this.router.navigate(['teams', click.notification.data.teamId]);
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
