import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  @Input()
  members: [{ name: string | null, email: string }];
  @Input()
  index: number;
  @Input()
  length: number;
  name: string;

  constructor() {
    this.length = 5;
  }

  ngOnInit(): void {
    this.name = `Úsek ${this.index + 1}`;
  }

}
