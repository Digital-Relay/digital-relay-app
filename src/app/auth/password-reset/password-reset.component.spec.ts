import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordResetComponent} from './password-reset.component';
import {AuthApiService} from '../auth-api.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [PasswordResetComponent],
      providers: [
        {provide: AuthApiService, useValue: null}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
