import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagePassCourseService {

  constructor(
    private http: HttpClientService
  ) { }

  getMemberInCourse(courseId: number) {
    return this.http.get(ApiConstants.baseURl+ `/graduated/${courseId}`)
      .pipe(
        map((res) => {
          const data = res['data'].map( (member) => {
            var checked = member.status === '1'? true:false;
            return {
              ...member,
              checked:checked
            }
          })
          return {
            status:res['result'],
            data: data
          }
        })
      )
  }
}
