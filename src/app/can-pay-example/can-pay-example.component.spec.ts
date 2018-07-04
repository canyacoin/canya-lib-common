import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanPayComponent } from './can-pay.component';

describe('CanPayComponent', () => {
  let component: CanPayComponent;
  let fixture: ComponentFixture<CanPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
