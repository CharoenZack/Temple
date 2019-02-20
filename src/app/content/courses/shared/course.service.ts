import { Injectable } from '@angular/core';
import { Course } from './course';
import { MockCourse } from './mock-course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses:Course[] = MockCourse;

  constructor() { }
  getCourses() : Course[] {
    const courses = this.courses
    return courses;

  }
  getCourse(id: number): Course{
    const index = this.courses.findIndex(course => course.id === id);
    const { date,name,annotation,location,detail} = this.courses[index];
    return{
      id,
      date,
      name,
      annotation,
      detail,
      location
    };

  }
}
