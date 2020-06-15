import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StageComponent} from './stage.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';
import {MatDialogModule} from '@angular/material/dialog';
import {ActivatedRoute, Params} from '@angular/router';
import {of} from 'rxjs';

describe('StageComponent', () => {
  let component: StageComponent;
  let fixture: ComponentFixture<StageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [StageComponent],
      providers: [
        provideMockStore({initialState: initialTestState}),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({} as Params)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageComponent);
    component = fixture.componentInstance;
    component.stage = {
      index: 0,
      email: 'm.pilnan@gmail.com',
      estimated_time: 3350,
      real_time: null,
      length: 5,
      id: '5ed69b543f3226cf76327fbd'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
