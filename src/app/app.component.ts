import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SwPush} from '@angular/service-worker';
import {Store} from '@ngrx/store';
import {DigitalRelayState} from './store';
import {acceptRelay, loadOne} from './store/actions/teams.actions';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DXC RUN 4U';

  constructor(public router: Router, private swPush: SwPush, private store: Store<DigitalRelayState>) {
    if (localStorage.getItem('lastRaceDate') !== environment.raceDate.toString()) {
      localStorage.setItem('lastRaceDate', environment.raceDate.toString());
      localStorage.removeItem('lastAcceptedStage');
    }
    this.swPush.notificationClicks.subscribe(click => {
      if (click.notification.data.teamId) {
        this.store.dispatch(loadOne({id: click.notification.data.teamId}));
        if (click.action === 'relay') {
          this.store.dispatch(acceptRelay({teamId: click.notification.data.teamId, stageIndex: click.notification.data.stage}));
        }
        this.router.navigate(['teams', click.notification.data.teamId]);
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
