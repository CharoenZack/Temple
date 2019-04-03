import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ApiConstants} from '../../shared/constants/ApiConstants';
import {HttpClientService} from '../../shared/service/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {


  constructor(
    private http: HttpClientService,
  ) {
  }


  getCoursesApproval() {
    return this.http.get(ApiConstants.baseURl + '/courses/approve').pipe(
      map(res => ({
        status: res['result'],
        data: res['data']
      }))
    );
  }


}
