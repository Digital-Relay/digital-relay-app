import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TempoDialogComponent} from './tempo-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

describe('TempoDialogComponent', () => {
  let component: TempoDialogComponent;
  let fixture: ComponentFixture<TempoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TempoDialogComponent],
      providers: [
        FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
