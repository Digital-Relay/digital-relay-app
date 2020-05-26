import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../store/user-model/user-model.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {errorMessages, maxLengths} from '../../globals';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public form: FormGroup;
  public user: UserModel = {
    id: '5ec966e29f49583e027519cb',
    email: 'm.pilnan@gmail.com',
    name: 'Matúš Pilňan',
    tempo: 65
  };

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: [this.user.name, [Validators.required, Validators.maxLength(maxLengths.name)]],
      tempoMinutes: [Math.floor(this.user.tempo / 60), [Validators.required, Validators.min(0)]],
      tempoSeconds: [this.user.tempo % 60, [Validators.required, Validators.min(0), Validators.max(59)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('edit');
  }

  getErrorMessage(field: string) {
    return errorMessages(this.form.get(field));
  }
}
