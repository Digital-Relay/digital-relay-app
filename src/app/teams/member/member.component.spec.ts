import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberComponent} from './member.component';
import {MatDialogModule} from '@angular/material/dialog';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from '../../store';

describe('MemberComponent', () => {
  let component: MemberComponent;
  let fixture: ComponentFixture<MemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [MemberComponent],
      providers: [
        provideMockStore({initialState: initialTestState})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberComponent);
    component = fixture.componentInstance;
    component.user = {
      name: 'Test Testerson',
      email: 'test@test.ts',
      tempo: 200
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
