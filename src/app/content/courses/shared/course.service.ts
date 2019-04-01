import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCourses() {
    return this.http.get(ApiConstants.baseURl + '/courses', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result'],
          data: res['data']
        };
      })
    );
  }

  getCourse(id) {
    return this.http.get(ApiConstants.baseURl + `/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).pipe(map(res => {
      return {
        status: res['result'],
        data: res['data'][0]
      };
    }));
  }

  assignCourse(id) {
    return this.http.post(ApiConstants.baseURl + `/courses/register`, { courseId: id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }


  createCourse() {
    return this.http.post(ApiConstants.baseURl + `/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }
  editCourse(id) {
    return this.http.patch(ApiConstants.baseURl + `/courses`, { courseId: id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }

  deleteCourse(id) {
    return this.http.patch(ApiConstants.baseURl + `/courses`, { courseId: id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }
  approvalCourse(id) {
    return this.http.post(ApiConstants.baseURl + `/courses/approval`, { courseId: id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
  }

  cancelApprovalCourse(id) {
    return this.http.delete(ApiConstants.baseURl + `/courses/approval/${id}`,  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    });
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
