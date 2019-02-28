import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(dataUser){
    console.log(dataUser);
    this.http.post('http://localhost:3999/api/v1/members', dataUser)
    .subscribe(res=>{
      console.log('success')
      console.log(res);
    },
    err =>{
      console.log("Error",err);
    });
  }

  getAllUsers(){
    return this.http.get('http://localhost:3999/api/v1/members')
    .pipe(
      map((response:any[]) => {
        return response['data'].map((data)=>{
          return {
            id:data['memberId'],
            titleNameDisplay:data['memberTitleName']['titleDisplay'],
            fname:data['memberFname'],
            lname:data['memberLname']
          }
        });
      })
    )
  }
}
