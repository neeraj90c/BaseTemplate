import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadWorklistComponent } from './lead-worklist.component';

describe('LeadWorklistComponent', () => {
  let component: LeadWorklistComponent;
  let fixture: ComponentFixture<LeadWorklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadWorklistComponent]
    });
    fixture = TestBed.createComponent(LeadWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
