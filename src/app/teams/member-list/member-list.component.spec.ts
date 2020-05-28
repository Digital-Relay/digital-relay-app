import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberListComponent} from './member-list.component';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('MemberListComponent', () => {
  let component: MemberListComponent;
  let fixture: ComponentFixture<MemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      declarations: [MemberListComponent],
      providers: [
        FormBuilder,
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListComponent);
    component = fixture.componentInstance;
    component.team = {
      id: '5ec45033adc29e0dc932218e',
      name: 'Test team',
      donation: 70,
      members: [
        'matt@nobien.net',
        'aaaa@bbb.ccc'
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
