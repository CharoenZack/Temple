import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';


@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  // private loggedIn: new Subject<boolean>;
  private role = new BehaviorSubject<String>('user');
  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    
  }

  getRole() {
    return this.role;
  }
  setRole(role:String){
    this.role.next(role);
  }

  login(username, password) {
    const body = {
      username: username,
      password: password
    }
    const responseObservable = this.http.post(ApiConstants.baseURl + '/auth/login', body)
    responseObservable.subscribe(res => {
      if (res['result'] === 'Success') {
        console.log(res);
        this.role.next(res['roleName']);
        const accessToken = res['access_token'];
        localStorage.setItem('access-token', accessToken);
        this.loggedIn.next(true);
        this.router.navigate(["/"]);
      }
    });
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  logout() {
    localStorage.clear()
    this.router.navigate(["/auth/login"]);
  }
}
