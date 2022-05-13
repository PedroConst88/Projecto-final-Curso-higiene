import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWorkersComponent } from './register-workers.component';

describe('RegisterWorkersComponent', () => {
  let component: RegisterWorkersComponent;
  let fixture: ComponentFixture<RegisterWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
