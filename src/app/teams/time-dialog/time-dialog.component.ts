import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {errorMessages} from '../../globals';

@Component({
  selector: 'app-time-dialog',
  templateUrl: './time-dialog.component.html',
  styleUrls: ['./time-dialog.component.css']
})
export class TimeDialogComponent implements OnInit {
  title: string;
  message: string;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TimeDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: TimeDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.form = this.fb.group({
      hours: [data.hours, [Validators.required, Validators.min(0)]],
      minutes: [data.minutes, [Validators.required, Validators.min(0), Validators.max(59)]]
    });
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close({hours: this.form.value.hours, minutes: this.form.value.minutes});
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  getErrorMessage(field: string) {
    return errorMessages(this.form.get(field));
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class TimeDialogModel {

  constructor(public title: string, public message: string, public hours: number, public minutes: number) {
  }
}
