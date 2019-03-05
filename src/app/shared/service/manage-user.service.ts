import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiConstants } from '../constants/ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(dataUser){
    console.log(dataUser);
    this.http.post(ApiConstants.baseURl+'/members', dataUser)
    .subscribe(res=>{
      console.log('success')
      console.log(res);
    },
    err =>{
      console.log("Error",err);
    });
  }

  getAllUsers(){
    return this.http.get(ApiConstants.baseURl+'/members')
    .pipe(
      map((response) => {
        return {
          status: response['result'],
          data: response['data']
        }
      })
    )
  }
}
