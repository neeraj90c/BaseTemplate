import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAssignedToOthersComponent } from './lead-assigned-to-others.component';

describe('LeadAssignedToOthersComponent', () => {
  let component: LeadAssignedToOthersComponent;
  let fixture: ComponentFixture<LeadAssignedToOthersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadAssignedToOthersComponent]
    });
    fixture = TestBed.createComponent(LeadAssignedToOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
