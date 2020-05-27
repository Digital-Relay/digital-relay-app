import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../../store';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {State} from '../../store/reducers/auth.reducer';
import {errorMessages, maxLengths} from '../../globals';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @Output()
  memberAdded = new EventEmitter<{ email: string }>();
  @Output()
  memberRemoved = new EventEmitter<{ email: string }>();
  @Input()
  team: any;
  teamForm: FormGroup;
  state: Observable<State>;

  constructor(private fb: FormBuilder, private router: Router, private store: Store<DigitalRelayState>, private snackBar: MatSnackBar) {
    this.teamForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(maxLengths.email)]],
    });
    this.state = store.select(selectUser);
  }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {
    return errorMessages(this.teamForm.get(field));
  }

  onSubmit() {
    this.memberAdded.emit(this.teamForm.value);
    this.snackBar.open('Pozvánka bola odoslaná', 'OK', {duration: 3000});
    this.teamForm.reset();
  }

  onMemberDelete($event: { email: string }) {
    this.memberRemoved.emit($event);
  }
}
