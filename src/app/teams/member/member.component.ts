import {Component, Input, OnInit} from '@angular/core';
import {ConfirmDialogComponent, ConfirmDialogModel} from 'src/app/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DigitalRelayState, selectUsersList} from '../../store';
import {select, Store} from '@ngrx/store';
import {UserModel} from '../../store/user-model/user-model.model';
import {map} from 'rxjs/operators';
import {adapter} from '../../store/user-model/user-model.reducer';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input()
  email: any;
  user: UserModel;
  userName: string;

  constructor(private dialog: MatDialog, private store: Store<DigitalRelayState>) {
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
    this.store.pipe(
      select(selectUsersList),
      select(adapter.getSelectors().selectAll),
      map((u: UserModel[]) => u.filter(userModel => userModel.email === this.email))
    ).subscribe(user => {
      if (user.length > 0) {
        this.user = user[0];
        this.userName = this.user.name ? this.user.name : `${this.user.email} (Pozvánka odoslaná)`;
      } else {
        this.userName = this.email;
        this.user = {name: this.email, email: this.email, id: '', tempo: 0};
      }
    });
  }
}
