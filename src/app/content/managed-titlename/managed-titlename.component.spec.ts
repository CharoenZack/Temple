import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedTitlenameComponent } from './managed-titlename.component';

describe('ManagedTitlenameComponent', () => {
  let component: ManagedTitlenameComponent;
  let fixture: ComponentFixture<ManagedTitlenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedTitlenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedTitlenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
