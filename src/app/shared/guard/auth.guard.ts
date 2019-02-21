import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedIn: boolean
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn().subscribe(res => this.isLoggedIn = res);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.isLoggedIn) return true;

    this.router.navigate(['/auth/login']);
    return false;
  }

}
