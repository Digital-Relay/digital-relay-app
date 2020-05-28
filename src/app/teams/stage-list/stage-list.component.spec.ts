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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
