import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedToOthersComponent } from './assigned-to-others.component';

describe('AssignedToOthersComponent', () => {
  let component: AssignedToOthersComponent;
  let fixture: ComponentFixture<AssignedToOthersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedToOthersComponent]
    });
    fixture = TestBed.createComponent(AssignedToOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
