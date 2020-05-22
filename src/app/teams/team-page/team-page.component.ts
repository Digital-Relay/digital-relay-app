import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {State} from "../../store/reducers/auth.reducer";
import {Store} from "@ngrx/store";
import {DigitalRelayState, selectUser} from "../../store";

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

  state: Observable<State>
  loggedIn: boolean;
  teamForm: FormGroup;
  email: String;

  constructor(private fb: FormBuilder, private router: Router, private store: Store<DigitalRelayState>) {
    this.teamForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.state = store.select(selectUser)
  }

  ngOnInit(): void {
    this.state.subscribe(status => {
      this.loggedIn = status.isLoggedIn;
      if (!this.loggedIn) {
        this.router.navigate(['login']);
      }
    });
  }

  onSubmit() {
    console.log(this.teamForm.value);
  }

}
