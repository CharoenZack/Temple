import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) {

  }

  getSchedule() {
    return this.http.get(ApiConstants.baseURl + '/courses/schedule',
      {
        headers:
          { Authorization: `Bearer ${localStorage.getItem('access-token')}` }
      })
      .pipe(
        map(res => {
          const data = res['data'].map(data => {
            return {
              title: data['courseName'],
              start: data['courseScheduleDate']
            }
          })
          return {
            status: res['result'],
            data: data
          }
        })
      )

  }
}
