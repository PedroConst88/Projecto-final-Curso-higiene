import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHousesComponent } from './card-houses.component';

describe('CardHousesComponent', () => {
  let component: CardHousesComponent;
  let fixture: ComponentFixture<CardHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
