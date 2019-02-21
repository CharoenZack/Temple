import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
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
    this.loggedIn.next(false);
    this.router.navigate(["/auth/login"]);
  }
}
