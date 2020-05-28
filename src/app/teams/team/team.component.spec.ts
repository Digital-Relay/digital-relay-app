import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamComponent} from './team.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamComponent],
      providers: [
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    component.team = {
      id: '5ec45033adc29e0dc932218e',
      name: 'Test team',
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
