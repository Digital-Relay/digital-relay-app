import {Component, Input, OnInit} from '@angular/core';
import {ConfirmDialogComponent, ConfirmDialogModel} from 'src/app/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input()
  user: any;

  constructor(private dialog: MatDialog) {
  }

  getName(): string {
    return this.user.name ? this.user.name : `${this.user.email} (Pozvánka odoslaná)`;
  }

  confirmDialog(): void {
    const message = `Naozaj chcete z tímu vyhodiť člena ${this.user.name ? this.user.name : this.user.email}?`;

    const dialogData = new ConfirmDialogModel('Potvrdenie', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult);
    });
  }

  ngOnInit(): void {
  }

}
