import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addstaff } from './addstaff';

describe('Addstaff', () => {
  let component: Addstaff;
  let fixture: ComponentFixture<Addstaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addstaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addstaff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
