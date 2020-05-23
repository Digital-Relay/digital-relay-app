import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../../store';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {State} from '../../store/reducers/auth.reducer';
import {maxLengths} from '../../globals';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
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
    if (this.teamForm.get(field).hasError('email')) {
      return 'Neplatný e-mail.';
    }
    if (this.teamForm.get(field).hasError('required')) {
      return 'Toto pole je povinné.';
    }
    if (this.teamForm.get(field).hasError('maxlength')) {
      return 'Zadaná hodnota je príliš dlhá.';
    }
    return '';
  }

  onSubmit() {
    console.log(this.teamForm.value);

    // po uspesnom odoslani poziadavky
    this.snackBar.open('Pozvánka bola odoslaná', 'OK', {duration: 3000});
    this.teamForm.reset();
  }

}
