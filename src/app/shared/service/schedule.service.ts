import { Injectable } from '@angular/core';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClientService
  ) {

  }

  getSchedule() {
    return this.http.get(ApiConstants.baseURl + '/courses/schedule')
      .pipe(
        map(res => {
          const array: [{ key: string, title: string, start: string, end: string, url: string }] = res['data'].map(data => ({
            key: data['courseId'],
            title: data['course']['courseName'],
            start: data['course']['courseStDate'],
            end: data['course']['courseEndDate'],
            url: `#/courses/${data['courseId']}`
          }));
          console.log('array', array);
          return {
            status: res['result'],
            data: Array.from(new Set(array.map(s => s.key))).map(key => {
              return {
                title: array.find(s => s.key === key).title,
                start: array.find(s => s.key === key).start,
                end: array.find(s => s.key === key).end,
                url: array.find(s => s.key === key).url,
              };
            })
          };
        })
      );
  }

  getScheduleForMonk() {
    return this.http.get(ApiConstants.baseURl + '/courses/teacher_schedule')
      .pipe(
        map(res => {
          const array: [{ key: string, title: string, start: string, end: string, url: string }] = res['data'].map(data => ({
            key: data['courseId'],
            title: data['course']['courseName'],
            start: data['course']['courseStDate'],
            end: data['course']['courseEndDate'],
            url: `#/courses/${data['courseId']}`
          }));
          console.log('array', array);
          return {
            status: res['result'],
            data: Array.from(new Set(array.map(s => s.key))).map(key => {
              return {
                title: array.find(s => s.key === key).title,
                start: array.find(s => s.key === key).start,
                end: array.find(s => s.key === key).end,
                url: array.find(s => s.key === key).url,
              };
            })
          };
        })
      );
  }
}
