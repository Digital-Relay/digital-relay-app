import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {State} from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {
  team = {
    name: 'Test team',
    members: [
      {
        name: 'Test Testerson',
        email: 'test@test.ts'
      },
      {
        name: 'Test Testerson 2',
        email: 'test@test.ts'
      },
      {
        name: null,
        email: 'niekto@iny.net'
      }
    ]
  };

  state: Observable<State>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
