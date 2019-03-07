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

  createUser(dataUser) {
    console.log(dataUser);
    this.http.post(ApiConstants.baseURl + '/members', dataUser)
    .subscribe(res => {
      console.log('success')
      console.log(res);
    },
    err => {
      console.log('Error', err);
    });
  }

  getUser(id) {
    return this.http.get(ApiConstants.baseURl + `/members/${id}`)
      .pipe(
        map((res) => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }

  getAllUsers() {
    return this.http.get(ApiConstants.baseURl + '/members')
    .pipe(
      map((res) => {
        const data = res['data']
          .map(member => {
            return {
              id: member['id'],
              titleName: member['titleName'],
              fname: member['fname'],
              lname: member['lname']
            };
          } )
        return {
          status: res['result'],
          data: data
        };
      })
    );
  }
}
