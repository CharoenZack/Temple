import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggagesComponent } from './baggages.component';

describe('BaggagesComponent', () => {
  let component: BaggagesComponent;
  let fixture: ComponentFixture<BaggagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaggagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaggagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
