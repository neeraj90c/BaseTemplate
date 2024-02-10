import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalHeaderComponent } from './graphical-header.component';

describe('GraphicalHeaderComponent', () => {
  let component: GraphicalHeaderComponent;
  let fixture: ComponentFixture<GraphicalHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicalHeaderComponent]
    });
    fixture = TestBed.createComponent(GraphicalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
