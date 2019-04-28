import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { HttpClientService } from './http-client.service';
@Injectable({
  providedIn: 'root'
})
export class BaggageService {

  constructor(
    private http: HttpClient,
    private httpService: HttpClientService
  ) { }

  getItems() {
    return this.http.get(ApiConstants.baseURl + '/baggages', {
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

  getItem() {
    return this.http.get(ApiConstants.baseURl + '/lockers', {
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

  update(data) {
    console.log(data);

    const body = {
      number: data['number']
    };

    return this.http.put(ApiConstants.baseURl + `/lockers/${data['id']}`, body, { headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` } })
      .pipe(map((res) => {
        return {
          status: res['result'],
          data: res['data'][0]
        };
      }));

  }

  delete(id) {
    return this.http.delete(ApiConstants.baseURl + `/lockers/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` } })
      .pipe(map(res => {
        return {
          status: res['result']
        };
      }));
  }

  save(data) {
    return this.http.post(ApiConstants.baseURl + `/lockers`, {
      number: data['name'],
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` } })
      .pipe(map(res => {
        console.log(res);
        return{
          status: res['result'],
          data: res['data']
        }
      }));
  }

  saveStorage(memberId, baggageId) {
    return this.httpService.post(ApiConstants.baseURl + `/baggages`, {
      memberId: memberId,
      baggageId: baggageId
    })
    .pipe(map(res => {
      console.log(res);
      return{
        status: res['result'],
        data: res['data']
      }
    }));
  }
}
