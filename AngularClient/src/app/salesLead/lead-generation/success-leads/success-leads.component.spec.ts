import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessLeadsComponent } from './success-leads.component';

describe('SuccessLeadsComponent', () => {
  let component: SuccessLeadsComponent;
  let fixture: ComponentFixture<SuccessLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessLeadsComponent]
    });
    fixture = TestBed.createComponent(SuccessLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
