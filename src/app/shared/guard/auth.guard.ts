import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedIn: boolean
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    
    this.authService.isLoggedIn().subscribe(res=>this.isLoggedIn = res);

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      console.log(this.isLoggedIn);
      
    
    if(this.isLoggedIn === true) {
      return true;
    } 
    else{
      this.authService.isLoggedIn().subscribe(console.log)
      console.log(this.isLoggedIn, 'c1');
      this.router.navigate(['/auth/login']);
      console.log(this.isLoggedIn, 'c2');
      return false;
    }
    
  }

}
