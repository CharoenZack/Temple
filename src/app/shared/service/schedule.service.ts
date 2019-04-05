import {Injectable} from '@angular/core';
import {ApiConstants} from '../constants/ApiConstants';
import {map} from 'rxjs/operators';
import {HttpClientService} from './http-client.service';

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
          return {
            status: res['result'],
            data: res['data'].map(data => ({
              title: data['course']['courseName'],
              start: data['courseScheduleDate'],
              url: `/courses/${data['courseId']}`
            }))
          };
        })
      );

  }
}
