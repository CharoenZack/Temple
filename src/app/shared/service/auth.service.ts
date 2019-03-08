import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import { log } from 'util';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  // private loggedIn: new Subject<boolean>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login(username, password) {
    const body = {
      username: username,
      password: password
    };
    const responseObservable = this.http.post(ApiConstants.baseURl + '/auth/login', body);
    responseObservable.subscribe(res => {
      // access_token
      if (res['result'] === 'Success') {
        const accessToken = res['access_token'];
        localStorage.setItem('access-token', accessToken);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      }
    });
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
