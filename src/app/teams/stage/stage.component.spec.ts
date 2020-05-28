import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StageComponent} from './stage.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';

describe('StageComponent', () => {
  let component: StageComponent;
  let fixture: ComponentFixture<StageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageComponent],
      providers: [
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
