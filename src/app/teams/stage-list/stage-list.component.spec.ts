import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StageListComponent} from './stage-list.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';

describe('StageListComponent', () => {
  let component: StageListComponent;
  let fixture: ComponentFixture<StageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageListComponent],
      providers: [
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageListComponent);
    component = fixture.componentInstance;
    component.team = {
      id: '5ec5914ced59b339a6be6c50',
      name: 'Matt\'s test team',
      donation: 10,
      members: [
        'm.pilnan@gmail.com',
        'matt@nobien.net'
      ],
      start: 0,
      stages: [
        {
          index: 0,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fbd'
        },
        {
          index: 1,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fbe'
        },
        {
          index: 2,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fbf'
        },
        {
          index: 3,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc0'
        },
        {
          index: 4,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc1'
        },
        {
          index: 5,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc2'
        },
        {
          index: 6,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc3'
        },
        {
          index: 7,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc4'
        },
        {
          index: 8,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc5'
        },
        {
          index: 9,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc6'
        },
        {
          index: 10,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc7'
        },
        {
          index: 11,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc8'
        },
        {
          index: 12,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fc9'
        },
        {
          index: 13,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fca'
        },
        {
          index: 14,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fcb'
        },
        {
          index: 15,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fcc'
        },
        {
          index: 16,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fcd'
        },
        {
          index: 17,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fce'
        },
        {
          index: 18,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b543f3226cf76327fcf'
        },
        {
          index: 19,
          email: 'm.pilnan@gmail.com',
          estimated_time: 3350,
          real_time: null,
          length: 5,
          id: '5ed69b553f3226cf76327fd0'
        }
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
