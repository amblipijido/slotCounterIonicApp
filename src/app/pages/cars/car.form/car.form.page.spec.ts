import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFormPage } from './car.form.page';

describe('CarsPage', () => {
  let component: CarFormPage;
  let fixture: ComponentFixture<CarFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
