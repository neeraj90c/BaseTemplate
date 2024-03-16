import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAssignedToMeComponent } from './lead-assigned-to-me.component';

describe('LeadAssignedToMeComponent', () => {
  let component: LeadAssignedToMeComponent;
  let fixture: ComponentFixture<LeadAssignedToMeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadAssignedToMeComponent]
    });
    fixture = TestBed.createComponent(LeadAssignedToMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
