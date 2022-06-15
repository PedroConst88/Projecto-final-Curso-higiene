import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHousesComponent } from './add-houses.component';

describe('AddHousesComponent', () => {
  let component: AddHousesComponent;
  let fixture: ComponentFixture<AddHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
