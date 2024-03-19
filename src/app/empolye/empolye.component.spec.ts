import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpolyeComponent } from './empolye.component';

describe('EmpolyeComponent', () => {
  let component: EmpolyeComponent;
  let fixture: ComponentFixture<EmpolyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpolyeComponent]
    });
    fixture = TestBed.createComponent(EmpolyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
