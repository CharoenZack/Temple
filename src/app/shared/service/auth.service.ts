import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(username, password) {
    this.loggedIn.next(true);
    this.router.navigate(["/"]);
  }

  logout() {
  this.loggedIn.next(false)
    this.router.navigate(["/auth/login"]);
  }
}
