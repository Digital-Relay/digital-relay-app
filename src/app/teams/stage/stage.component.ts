import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {DigitalRelayState, selectUsersList} from '../../store';
import {adapter} from '../../store/user-model/user-model.reducer';
import {map} from 'rxjs/operators';
import {UserModel} from '../../store/user-model/user-model.model';
import {Team} from '../../api/models/team';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  @Output()
  public stageChange = new EventEmitter<{ name: string | null, email: string }>();

  @Input()
  team: Team;
  @Input()
  index: number;
  @Input()
  length: number;
  name: string;
  users;
  selectedUserValue: string;

  constructor(private store: Store<DigitalRelayState>) {
    this.length = 5;
  }

  ngOnInit(): void {
    this.name = `Úsek ${this.index + 1}`;
    this.store.pipe(
      select(selectUsersList),
      select(adapter.getSelectors().selectAll),
      map((u: UserModel[]) => u.filter(userModel => userModel.email === this.team.stages[this.index]))
    ).subscribe(user => {
      if (user.length > 0) {
        this.selectedUserValue = user[0].email;
      } else {
        this.selectedUserValue = '';
      }
    });
    this.store.pipe(
      select(selectUsersList),
      select(adapter.getSelectors().selectAll),
      map((u: UserModel[]) => u.filter(userModel => this.team.members.includes(userModel.email)))
    ).subscribe(users => {
      this.users = users;
    });
  }

  onValueChange($value) {
    this.stageChange.emit($value);
  }
}
