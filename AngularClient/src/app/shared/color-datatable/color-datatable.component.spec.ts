import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDatatableComponent } from './color-datatable.component';

describe('ColorDatatableComponent', () => {
  let component: ColorDatatableComponent;
  let fixture: ComponentFixture<ColorDatatableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorDatatableComponent]
    });
    fixture = TestBed.createComponent(ColorDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
