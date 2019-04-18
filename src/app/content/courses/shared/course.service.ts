import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
import { SpecialApprove } from '../../../shared/interfaces/special-approve';
import { HttpClientService } from 'src/app/shared/service/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClientService
  ) {
  }

  getTotalRecord() {
    return this.http.get(`${ApiConstants.baseURl}/courses/count`).pipe(
      map(res => ({
        status: res['result'],
        data: res['data']
      }))
    );
  }

  getCourseByid(id) {
    return this.http.get(ApiConstants.baseURl + `/courses/${id}`).pipe(
      map(res => ({
        status: res['result'],
        data: res['data'][0]
      })
      ));
  }

  getCourses(first: number, rows: number, query: string) {
    return this.http.get(`${ApiConstants.baseURl}/courses?query=${query}&offset=${first}&limit=${rows}`).pipe(
      map(res => {
        return {
          status: res['result'],
          data: res['data']
        };
      })
    );
  }

  assignCourse(id) {
    return this.http.post(ApiConstants.baseURl + `/courses/register`, { courseId: id });
  }


  createCourse(data) {
    return this.http.post(ApiConstants.baseURl + `/courses`, data);
  }

  editCourse(id, course) {
    return this.http.patch(ApiConstants.baseURl + `/courses/${id}`, course);
  }

  // deleteCourse(id) {
  //   return this.http.patch(ApiConstants.baseURl + `/courses`, {courseId: id});
  // }

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

  deleteCourse(courseId) {
    return this.http.put(ApiConstants.baseURl + `/courses/deleteCourse/${courseId}`, null)
      .pipe(
        map(res => {
            return {
              status : res['result']
            }
          }
        )
      )
  }
  


}
