import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(dataUser) {
    console.log(dataUser);
    this.http.post('http://localhost:3999/api/v1/members', dataUser)
    .subscribe(res=>{
      console.log(res);
    },
    err =>{
      console.log("Error",err);
    });
  }
}
