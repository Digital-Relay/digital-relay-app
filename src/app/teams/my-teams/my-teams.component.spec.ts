import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapToArray, MyTeamsComponent} from './my-teams.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';

describe('MyTeamsComponent', () => {
  let component: MyTeamsComponent;
  let fixture: ComponentFixture<MyTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyTeamsComponent, MapToArray],
      providers: [
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
