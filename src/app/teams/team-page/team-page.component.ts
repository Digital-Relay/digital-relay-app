import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
