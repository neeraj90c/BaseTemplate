import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressLeadsComponent } from './inprogress-leads.component';

describe('InprogressLeadsComponent', () => {
  let component: InprogressLeadsComponent;
  let fixture: ComponentFixture<InprogressLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InprogressLeadsComponent]
    });
    fixture = TestBed.createComponent(InprogressLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
