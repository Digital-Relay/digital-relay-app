import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {State} from '../../store/reducers/auth.reducer';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../../store';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  loggedIn: boolean;
  teamForm: FormGroup;
  state: Observable<State>;

  constructor(private fb: FormBuilder, private router: Router, private store: Store<DigitalRelayState>) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      members: this.fb.array([
        this.fb.control('', Validators.email)
      ])
    });
    this.state = store.select(selectUser);
  }

  get members() {
    return this.teamForm.get('members') as FormArray;
  }

  ngOnInit(): void {
  }

  addMember() {
    this.members.push(this.fb.control('', Validators.email));
  }

  onSubmit() {
    console.log(this.teamForm.value);
  }

  manageMembers(thisIndex) {
    if ('' !== this.members.at(thisIndex).value &&
      (thisIndex === this.members.length - 1 || '' !== this.members.at(this.members.length - 1).value)) {
      this.addMember();
      this.members.at(this.members.length - 1).setValue('');
    } else if ('' === this.members.at(thisIndex).value) {
      this.members.removeAt(thisIndex);
    }
  }
}

