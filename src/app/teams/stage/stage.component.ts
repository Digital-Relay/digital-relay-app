import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  @Output()
  public stageChange = new EventEmitter<{ name: string | null, email: string }>();

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

  onValueChange($value) {
    this.stageChange.emit($value);
  }
}
