import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {
  team = {
    name: 'Test team',
    members: [
      {
        name: 'Test Testerson',
        email: 'test@test.ts'
      },
      {
        name: 'Test Testerson 2',
        email: 'test@test.ts'
      },
      {
        name: null,
        email: 'niekto@iny.net'
      }
    ]
  };


  loggedIn: boolean;
  teamForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      members: this.fb.array([
        this.fb.control('', Validators.email)
      ])
    });
  }

  get members() {
    return this.teamForm.get('members') as FormArray;
  }

  ngOnInit(): void {
    if (!this.loggedIn) {
      this.router.navigate(['login']);
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
