import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingTableSkeletonLoaderComponent } from './expanding-table-skeleton-loader.component';

describe('ExpandingTableSkeletonLoaderComponent', () => {
  let component: ExpandingTableSkeletonLoaderComponent;
  let fixture: ComponentFixture<ExpandingTableSkeletonLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandingTableSkeletonLoaderComponent]
    });
    fixture = TestBed.createComponent(ExpandingTableSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
