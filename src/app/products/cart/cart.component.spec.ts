import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CARTComponent } from './cart.component';

describe('CARTComponent', () => {
  let component: CARTComponent;
  let fixture: ComponentFixture<CARTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CARTComponent]
    });
    fixture = TestBed.createComponent(CARTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
