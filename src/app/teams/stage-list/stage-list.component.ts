import {Component, OnInit} from '@angular/core';
import {nrOfStages} from '../../globals';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {
  stages: Array<number>;
  members = [
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
  ];

  constructor() {
    this.stages = new Array(nrOfStages).fill(1);


  }

  ngOnInit(): void {
  }

}
