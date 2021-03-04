import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAksesComponent } from './page-akses.component';

describe('PageAksesComponent', () => {
  let component: PageAksesComponent;
  let fixture: ComponentFixture<PageAksesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAksesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAksesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
