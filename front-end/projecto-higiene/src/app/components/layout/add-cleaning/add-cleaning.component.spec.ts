import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCleaningComponent } from './add-cleaning.component';

describe('AddCleaningComponent', () => {
  let component: AddCleaningComponent;
  let fixture: ComponentFixture<AddCleaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCleaningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
