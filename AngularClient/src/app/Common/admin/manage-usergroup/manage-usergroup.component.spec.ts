import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsergroupComponent } from './manage-usergroup.component';

describe('ManageUsergroupComponent', () => {
  let component: ManageUsergroupComponent;
  let fixture: ComponentFixture<ManageUsergroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUsergroupComponent]
    });
    fixture = TestBed.createComponent(ManageUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
