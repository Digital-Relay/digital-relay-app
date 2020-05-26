import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTeamComponent} from './create-team.component';
import {FormBuilder} from '@angular/forms';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeamComponent],
      providers: [
        FormBuilder,
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
