import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {HttpClient} from '@angular/common/http';
import {ApiConstants} from '../constants/ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
  }

  auth() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('access-token')) {
        this.http.get(ApiConstants.baseURl + '/auth/loginWithToken',
          {
            headers:
              {Authorization: `Bearer ${localStorage.getItem('access-token')}`}
          })
          .toPromise().then(res => {
          console.log(res, 'res');
          if (res['result'] === 'Success') {
            this.authService.isLoggedIn().next(true);
            return resolve(true);
          } else {
            this.authService.isLoggedIn().next(false);
            return reject(false);
          }
        });
      } else {
        this.authService.isLoggedIn().next(false);
        return reject(false);
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.auth().then(() => {
      return true;
    }).catch(() => {
      this.router.navigate(['/auth/login']);
      return false;
    });

  }

}
