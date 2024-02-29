import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedTicketsComponent } from './closed-tickets.component';

describe('ClosedTicketsComponent', () => {
  let component: ClosedTicketsComponent;
  let fixture: ComponentFixture<ClosedTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedTicketsComponent]
    });
    fixture = TestBed.createComponent(ClosedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
