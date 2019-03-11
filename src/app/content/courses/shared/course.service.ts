import { Injectable } from '@angular/core';
import { Course } from './course';
import { MockCourse } from './mock-course';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getCourses() {
    return this.http.get(ApiConstants.baseURl + '/courses', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(map(res => {
      return {
        status: res['result'],
        data: res['data']
      }
    }))

    // const courses = this.courses
    // return courses;

  }
  getCourse(id) {
    return this.http.get(ApiConstants.baseURl + `/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(map(res => {
      console.log(res, 'get one');
      return {
        status: res['result'],
        data: res['data'][0]
      }
    }))
  }
  save(data) {
    // let courses = this.getCourses();
    // let l = courses.length
    // return [...courses,
    // {
    //   id: l+1,
    //   name: data
    // }
    // ];

  }
  showEdit(id) {
    // return  this.courses.filter(e => e.id == id)[0];

  }
  delete(id) {
    // const index = this.courses.findIndex(e => e.id == id);
    // return [
    //   ...this.courses.slice(0,index),
    //   ...this.courses.slice(index+1),
    // ]

  }
}
