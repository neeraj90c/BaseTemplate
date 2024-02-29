import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTicketsComponent } from './active-tickets.component';

describe('ActiveTicketsComponent', () => {
  let component: ActiveTicketsComponent;
  let fixture: ComponentFixture<ActiveTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveTicketsComponent]
    });
    fixture = TestBed.createComponent(ActiveTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
