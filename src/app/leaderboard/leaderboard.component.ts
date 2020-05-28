import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {DigitalRelayState, selectTeamsList} from '../store';
import {adapter} from '../store/team-model/team-model.reducer';
import {Observable} from 'rxjs';
import {TeamModel} from '../store/team-model/team-model.model';
import {loadAll} from '../store/actions/teams.actions';
import {MatSort, Sort} from '@angular/material/sort';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  teams$: Observable<TeamModel[]>;
  displayedColumns: string[] = ['name', 'members', 'donation'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<DigitalRelayState>) {
    this.store.dispatch(loadAll({}));

  }

  ngOnInit(): void {
    this.teams$ = this.store.pipe(
      select(selectTeamsList),
      select(adapter.getSelectors().selectAll)
    );
    this.sortData({active: 'donation', direction: 'desc'});
  }

  sortData($event: Sort) {
    this.teams$ = this.teams$.pipe(map(teams => {
      return teams.sort((a, b) => {
        const direction = $event.direction === 'asc' ? 1 : -1;
        if ($event.active === 'members') {
          return (a.members.length - b.members.length) * direction;
        }
        if (a[$event.active] < b[$event.active]) {
          return -1 * direction;
        }
        if (a[$event.active] > b[$event.active]) {
          return 1 * direction;
        }
        return 0;
      });
    }));
  }
}
