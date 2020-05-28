import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamPageComponent} from './team-page.component';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {of} from 'rxjs';

describe('TeamPageComponent', () => {
  let component: TeamPageComponent;
  let fixture: ComponentFixture<TeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TeamPageComponent],
      providers: [FormBuilder,
        provideMockStore({initialState: initialTestState}),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({id: '5ec5914ced59b339a6be6c50', get: (k) => '5ec5914ced59b339a6be6c50'} as unknown as ParamMap),
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPageComponent);
    component = fixture.componentInstance;
    component.team = {
      id: '5ec5914ced59b339a6be6c50',
      name: 'Matt\'s test team',
      members: [
        'm.pilnan@gmail.com',
        'matt@nobien.net'
      ],
      stages: [
        'matt@nobien.net',
        'm.pilnan@gmail.com',
        'matt@nobien.net',
        'matt@nobien.net',
        'matt@nobien.net',
        'm.pilnan@gmail.com',
        'm.pilnan@gmail.com',
        'matt@nobien.net',
        'm.pilnan@gmail.com',
        'm.pilnan@gmail.com',
        'matt@nobien.net',
        'm.pilnan@gmail.com',
        'm.pilnan@gmail.com',
        'matt@nobien.net',
        'm.pilnan@gmail.com',
        'm.pilnan@gmail.com',
        'matt@nobien.net',
        'm.pilnan@gmail.com',
        'm.pilnan@gmail.com',
        'matt@nobien.net'
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
