import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTeamComponent} from './create-team.component';
import {FormBuilder} from '@angular/forms';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeamComponent],
      providers: [FormBuilder]
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
