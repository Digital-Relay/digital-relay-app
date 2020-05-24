import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberComponent} from './member.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('MemberComponent', () => {
  let component: MemberComponent;
  let fixture: ComponentFixture<MemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [MemberComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberComponent);
    component = fixture.componentInstance;
    component.user = {
      name: 'Test Testerson',
      email: 'test@test.ts'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
