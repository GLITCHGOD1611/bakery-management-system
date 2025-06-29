import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addorder } from './addorder';

describe('Addorder', () => {
  let component: Addorder;
  let fixture: ComponentFixture<Addorder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addorder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addorder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
