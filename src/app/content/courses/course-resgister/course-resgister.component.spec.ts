import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseResgisterComponent } from './course-resgister.component';

describe('CourseResgisterComponent', () => {
  let component: CourseResgisterComponent;
  let fixture: ComponentFixture<CourseResgisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseResgisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseResgisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
