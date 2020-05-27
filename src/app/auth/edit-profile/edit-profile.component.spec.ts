import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditProfileComponent} from './edit-profile.component';
import {FormBuilder} from '@angular/forms';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      providers: [
        FormBuilder,
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
