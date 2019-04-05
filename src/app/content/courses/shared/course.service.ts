import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ApiConstants} from 'src/app/shared/constants/ApiConstants';
import {SpecialApprove} from '../../../shared/interfaces/special-approve';
import {Course} from '../../../shared/interfaces/course';
import { HttpClientService } from 'src/app/shared/service/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private course: Course;

  constructor(
    private http: HttpClientService
  ) {
  }

  setCourse(course: Course) {
    this.course = course;
  }

  getCourse(): Course {
    return this.course;
  }

  getCourses() {
    return this.http.get(ApiConstants.baseURl + '/courses').pipe(
      map(res => {
        return {
          status: res['result'],
          data: res['data']
        };
      })
    );
  }

  assignCourse(id) {
    return this.http.post(ApiConstants.baseURl + `/courses/register`, {courseId: id});
  }


  createCourse(data) {
    return this.http.post(ApiConstants.baseURl + `/courses`, data );
  }

  editCourse(id) {
    return this.http.patch(ApiConstants.baseURl + `/courses`, {courseId: id});
  }

  deleteCourse(id) {
    return this.http.patch(ApiConstants.baseURl + `/courses`, {courseId: id});
  }

  approvalCourse(data: SpecialApprove) {
    return this.http.post(ApiConstants.baseURl + `/approve`, data);
  }

  cancelApprovalCourse(id) {
    return this.http.delete(ApiConstants.baseURl + `/approve/${id}`);
  }
  
  getTeachers() {
    return this.http.get(ApiConstants.baseURl + `/members/monk`).pipe(
      map(res => {
        return {
          status: res['result'],
          data: res['data']
        };
      })
    );
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
