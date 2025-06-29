import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderdetail } from './orderdetail';

describe('Orderdetail', () => {
  let component: Orderdetail;
  let fixture: ComponentFixture<Orderdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orderdetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderdetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
