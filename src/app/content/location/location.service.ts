import { Injectable } from '@angular/core';
import { Location } from '../../shared/interfaces/location';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  location: Location;
  constructor(
    private http: HttpClient
  ) { }


  getLocation() {
    return this.http.get(ApiConstants.baseURl + '/locations')
      .pipe(
        map(res => {
          return {
            status : res['result'],
            data: res['data']
          };
        })
      );
  }


  save(data) {
      return this.http.post(ApiConstants.baseURl + `/locations`, data)
        .pipe(
          map(res => {
        return {
          status : res['result'],
          data: res['data'][0]
        };
      }));
  }

  update(data) {
    return this.http.put(ApiConstants.baseURl + `/locations/${data['id']}`, data)
      .pipe(map(res => {
      return {
        status : res['result'],
        data: res['data'][0]
      };
    }));
  }

  delete(id) {
    return this.http.delete(ApiConstants.baseURl + `/locations/${id}`)
    .pipe(map(res => {
      return {
        status: res['result']
      };
    }));
  }
}
