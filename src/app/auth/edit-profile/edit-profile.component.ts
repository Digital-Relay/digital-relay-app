import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from '../../store/user-model/user-model.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {errorMessages, maxLengths} from '../../globals';
import {select, Store} from '@ngrx/store';
import {DigitalRelayState, selectUser} from '../../store';
import {Observable} from 'rxjs';
import {uploadProfile} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public user$: Observable<UserModel>;

  constructor(private fb: FormBuilder, private store: Store<DigitalRelayState>) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.maxLength(maxLengths.name)]],
      tempoMinutes: ['', [Validators.required, Validators.min(0)]],
      tempoSeconds: ['', [Validators.required, Validators.min(0), Validators.max(59)]]
    });

  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(selectUser),
      select(auth => {
        this.form.get('name').setValue(auth.user.name);
        this.form.get('tempoMinutes').setValue(Math.floor(auth.user.tempo / 60));
        this.form.get('tempoSeconds').setValue(auth.user.tempo % 60);
        return auth.user;
      })
    );
  }

  onSubmit() {
    const tempo = this.form.value.tempoMinutes * 60 + this.form.value.tempoSeconds;
    this.store.dispatch(uploadProfile({user: {name: this.form.value.name, tempo} as UserModel}));
  }

  getErrorMessage(field: string) {
    return errorMessages(this.form.get(field));
  }

  ngOnDestroy(): void {
  }
}
