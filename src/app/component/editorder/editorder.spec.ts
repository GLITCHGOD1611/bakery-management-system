import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editorder } from './editorder';

describe('Editorder', () => {
  let component: Editorder;
  let fixture: ComponentFixture<Editorder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editorder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editorder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
