import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {maxLengths} from '../../globals';
import {DigitalRelayState} from "../../store";
import {Store} from "@ngrx/store";
import {create} from "../../store/actions/teams.actions";
import {TeamModel} from "../../store/team-model/team-model.model";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  teamForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<DigitalRelayState>) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required, Validators.maxLength(maxLengths.teamName)],
      members: this.fb.array([
        this.fb.control('', [Validators.email, Validators.maxLength(maxLengths.email)])
      ])
    });
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
    this.store.dispatch(create({
      members: this.teamForm.value.members.filter(value => value != ""),
      name: this.teamForm.value.teamName
    } as TeamModel))
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

  getErrorMessage(field: string) {
    if (this.teamForm.get(field).hasError('email')) {
      return 'Neplatný e-mail.';
    }
    if (this.teamForm.get(field).hasError('required')) {
      return 'Toto pole je povinné.';
    }
    if (this.teamForm.get(field).hasError('maxlength')) {
      return 'Zadaná hodnota je príliš dlhá.';
    }
  }
}

