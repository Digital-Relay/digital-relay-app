import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {errorMessages} from '../../globals';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tempo-dialog',
  templateUrl: './tempo-dialog.component.html',
  styleUrls: ['./tempo-dialog.component.css']
})
export class TempoDialogComponent implements OnInit {
  title: string;
  message: string;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TempoDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: TempoDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.form = this.fb.group({
      tempoMinutes: [Math.floor(data.tempo / 60), [Validators.required, Validators.min(0)]],
      tempoSeconds: [data.tempo % 60, [Validators.required, Validators.min(0), Validators.max(59)]]
    });
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close({tempo: this.form.value.tempoMinutes * 60 + this.form.value.tempoSeconds});
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
export class TempoDialogModel {

  constructor(public title: string, public message: string, public tempo: number) {
  }
}
