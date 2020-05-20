import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  teams = [
    {
      id: '5ec45033adc29e0dc932218e',
      name: 'Test team',
      members: [
        'matt@nobien.net',
        'aaaa@bbb.ccc'
      ]
    },
    {
      id: '5ec5914ced59b339a6be6c50',
      name: 'Matt\'s test team',
      members: [
        'm.pilnan@gmail.com',
        'matt@nobien.net'
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
