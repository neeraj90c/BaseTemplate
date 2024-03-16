import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLeadsComponent } from './open-leads.component';

describe('OpenLeadsComponent', () => {
  let component: OpenLeadsComponent;
  let fixture: ComponentFixture<OpenLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenLeadsComponent]
    });
    fixture = TestBed.createComponent(OpenLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
