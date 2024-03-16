import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadInProgressComponent } from './lead-in-progress.component';

describe('LeadInProgressComponent', () => {
  let component: LeadInProgressComponent;
  let fixture: ComponentFixture<LeadInProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadInProgressComponent]
    });
    fixture = TestBed.createComponent(LeadInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
