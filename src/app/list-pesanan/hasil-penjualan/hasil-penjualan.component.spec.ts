import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HasilPenjualanComponent } from './hasil-penjualan.component';

describe('HasilPenjualanComponent', () => {
  let component: HasilPenjualanComponent;
  let fixture: ComponentFixture<HasilPenjualanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasilPenjualanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasilPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
