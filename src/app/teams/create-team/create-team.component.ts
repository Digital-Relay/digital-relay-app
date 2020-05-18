import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  loggedIn: boolean;
  activeTab: number;

  teamForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      members: this.fb.array([
        this.fb.control('', Validators.email)
      ])
    });
  }

  onTabChanged($event) {
    const tabIndex = $event.index;
    if (tabIndex === 0) {
      this.activeTab = 0;
      this.teamForm.removeControl('register');
      this.teamForm.addControl('login', new FormControl());
    } else {
      this.activeTab = 1;
      this.teamForm.removeControl('login');
      this.teamForm.addControl('register', new FormControl());
    }
  }

  onLoginChanged($event) {
    if (!$event.checked) {
      this.teamForm.addControl('login', new FormControl());
      this.teamForm.addControl('register', new FormControl());
    } else {
      this.teamForm.removeControl('login');
      this.teamForm.removeControl('register');
    }
    console.log(this.teamForm);
  }

  get members() {
    return this.teamForm.get('members') as FormArray;
  }

  ngOnInit(): void {
    if (!this.loggedIn) {
      this.activeTab = 0;
      this.teamForm.addControl('login', new FormControl());
    }
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

