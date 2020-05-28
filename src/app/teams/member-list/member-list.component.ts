import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../../store';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {State} from '../../store/reducers/auth.reducer';
import {errorMessages, maxLengths} from '../../globals';
import {TeamModel} from '../../store/team-model/team-model.model';

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
  team: TeamModel;
  teamForm: FormGroup;
  state: Observable<State>;

  constructor(private fb: FormBuilder, private router: Router, private store: Store<DigitalRelayState>, private snackBar: MatSnackBar) {
    this.teamForm = this.fb.group({
      email: [''],
    });
    this.state = store.select(selectUser);
  }

  ngOnInit(): void {
    this.teamForm.get('email').setValidators([
      Validators.required,
      Validators.email,
      Validators.maxLength(maxLengths.email),
      alreadyIsMemberValidator(this.team.members)]);
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

export function alreadyIsMemberValidator(members: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = members.includes(control.value);
    return forbidden ? {alreadyIsMember: {value: control.value}} : null;
  };
}
