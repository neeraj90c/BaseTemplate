import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLeadsComponent } from './active-leads.component';

describe('ActiveLeadsComponent', () => {
  let component: ActiveLeadsComponent;
  let fixture: ComponentFixture<ActiveLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveLeadsComponent]
    });
    fixture = TestBed.createComponent(ActiveLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
