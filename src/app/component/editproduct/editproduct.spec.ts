import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editproduct } from './editproduct';

describe('Editproduct', () => {
  let component: Editproduct;
  let fixture: ComponentFixture<Editproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
