import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addproduct } from './addproduct';

describe('Addproduct', () => {
  let component: Addproduct;
  let fixture: ComponentFixture<Addproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
