import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import {formatDate} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class BaggageService {

  constructor(
    private http: HttpClient
  ) { }

  getItem() {
    return this.http.get(ApiConstants.baseURl + '/baggages')
      .pipe(
        map(res => {
          res['data'].map(data => {
            data['date'] = formatDate(data['date'], 'dd/MM/yyyy', 'en-US');
          });

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
      number : data['number'],
      createBy : 1
    };

    return this.http.put(ApiConstants.baseURl + `/baggages/${data['id']}`, body)
    .pipe(map((res) => {
      return {
        status: res['result'],
        data: res['data'][0]
      };
    }));

  }

  delete(id) {
    return this.http.delete(ApiConstants.baseURl + `/baggages/${id}`)
    .pipe(map(res => {
      return {
        status: res['result']
      };
    }));
  }

  save(data) {
    return this.http.post(ApiConstants.baseURl + `/baggages`, {
      baggageNumber: data['name'],
      baggageCreateBy : 1 ,
    })
    .pipe(map(res => {
      // console.log(res);
      //
      // const data = {
      //   date: formatDate(res['data'][0]['baggageDate'], 'dd/MM/yyyy', 'en-US'),
      //   number: res['data'][0]['baggageNumber'],
      //   id: res['data'][0]['baggageId']
      // };
      res['data'][0]['Date'] = formatDate(res['data'][0]['Date'], 'dd/MM/yyyy', 'en-US');
      return {
        status : res['result'],
        data: res['data'][0]
      };
    }));
  }
}
