import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editstaff } from './editstaff';

describe('Editstaff', () => {
  let component: Editstaff;
  let fixture: ComponentFixture<Editstaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editstaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editstaff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
