import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editcustomer } from './editcustomer';

describe('Editcustomer', () => {
  let component: Editcustomer;
  let fixture: ComponentFixture<Editcustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editcustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editcustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
