import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedLeadsComponent } from './closed-leads.component';

describe('ClosedLeadsComponent', () => {
  let component: ClosedLeadsComponent;
  let fixture: ComponentFixture<ClosedLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedLeadsComponent]
    });
    fixture = TestBed.createComponent(ClosedLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
