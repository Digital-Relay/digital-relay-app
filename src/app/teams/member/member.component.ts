import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input()
  user: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
