import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {maxLengths} from '../../globals';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  teamForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

