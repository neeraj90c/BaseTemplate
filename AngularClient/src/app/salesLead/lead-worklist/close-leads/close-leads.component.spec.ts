import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseLeadsComponent } from './close-leads.component';

describe('CloseLeadsComponent', () => {
  let component: CloseLeadsComponent;
  let fixture: ComponentFixture<CloseLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseLeadsComponent]
    });
    fixture = TestBed.createComponent(CloseLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
