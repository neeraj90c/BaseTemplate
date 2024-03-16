import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSuccessComponent } from './lead-success.component';

describe('LeadSuccessComponent', () => {
  let component: LeadSuccessComponent;
  let fixture: ComponentFixture<LeadSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadSuccessComponent]
    });
    fixture = TestBed.createComponent(LeadSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
