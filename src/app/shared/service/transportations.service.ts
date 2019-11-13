import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportationsService {

  constructor(
    private http: HttpClientService
  ) { }
  getTransportations() {
    return this.http.get(ApiConstants.baseURl + '/transportations')
      .pipe(
        map((res: any[]) => {
          return res['data'].map(data => {
            return {
              tranId: data['tranId'],
              tranName: data['tranName'],
              tranStatus: data['tranStatus']
            };
          });
        })
      );
  }
}
