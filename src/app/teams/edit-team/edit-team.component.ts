import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {maxLengths} from '../../globals';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  donation: number;
  @Output()
  teamEdited = new EventEmitter<{ name: string, donation: number }>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(maxLengths.teamName)]],
      donation: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.form.setValue({name: this.name, donation: this.donation});
  }

  onSubmit() {
    this.teamEdited.emit(this.form.value);
  }
}
