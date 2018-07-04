import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanPayExampleComponent } from './can-pay-example.component';

describe('CanPayComponent', () => {
  let component: CanPayExampleComponent;
  let fixture: ComponentFixture<CanPayExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanPayExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanPayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
