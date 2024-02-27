import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTableComponent } from './color-table.component';

describe('ColorTableComponent', () => {
  let component: ColorTableComponent;
  let fixture: ComponentFixture<ColorTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorTableComponent]
    });
    fixture = TestBed.createComponent(ColorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
