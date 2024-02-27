import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubrolesComponent } from './manage-subroles.component';

describe('ManageSubrolesComponent', () => {
  let component: ManageSubrolesComponent;
  let fixture: ComponentFixture<ManageSubrolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSubrolesComponent]
    });
    fixture = TestBed.createComponent(ManageSubrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
