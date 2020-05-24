import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormBuilder} from '@angular/forms';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';
import {AuthApiService} from '../auth-api.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [FormBuilder,
        provideMockStore({initialState: initialTestState}),
        {provide: AuthApiService, useValue: null}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
