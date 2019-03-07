import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  // private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedIn:Subject<boolean>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    if(localStorage.getItem("access-token")){
      this.http.get(ApiConstants.baseURl + '/auth/loginWithToken',{ headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` } })
      .subscribe(res=>{
        console.log(res)
        if(res['result']==="Success"){
          this.loggedIn.next(true);
        }else{
          this.loggedIn.next(false);
        }
      })
    }else{
      this.loggedIn.next(false);
    }
  }



  login(username, password) {
    const body ={
      username:username,
      password:password
    }
    const responseObservable = this.http.post(ApiConstants.baseURl+'/auth/login',body)
    responseObservable.subscribe(res => {
      //access_token
      if(res['result'] === 'Success'){
        const accessToken = res['access_token'];
        localStorage.setItem('access-token',accessToken);
        this.loggedIn.next(true);
        this.router.navigate(["/"]);
      }
    });
  }

  isLoggedIn(): Subject<boolean> {
    // const responseObservable = this.http.get(ApiConstants.baseURl + '/auth/loginWithToken',{ headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` } })
    // responseObservable.toPromise().then(res => {
    //   if(res['result'] == 'Success'){
    //       this.loggedIn.next(true);
    //   }
    //   console.log(this.loggedIn);
      
    // });
    // this.router.navigate(["/"]);
    return this.loggedIn;
  }
 
  logout() {
    localStorage.clear()
    this.router.navigate(["/auth/login"]);
    // this.isLoggedOut()
  }
}
