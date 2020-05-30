import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditTeamComponent} from './edit-team.component';
import {FormBuilder} from '@angular/forms';

describe('EditTeamComponent', () => {
  let component: EditTeamComponent;
  let fixture: ComponentFixture<EditTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTeamComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamComponent);
    component = fixture.componentInstance;
    component.name = 'Etwas';
    component.donation = 67.77;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
