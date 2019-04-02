import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ApiConstants} from 'src/app/shared/constants/ApiConstants';

@Injectable({
    providedIn: 'root'
})
export class ApprovalService {

    
    constructor(
        private http: HttpClient,
    ) {
    }


    getAllApproval(){
        return this.http.get(ApiConstants.baseURl + '/approve', {
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


}
