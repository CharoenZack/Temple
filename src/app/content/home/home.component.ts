import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public userId:String;
    public role:string;

    constructor(
        private breadCrumbService: BreadcrumbService,
        private authService:AuthService
    ) {
    }

    ngOnInit() {
        this.breadCrumbService.clearPath();
        this.userId = localStorage.getItem('userId');
        this.authService.getRole().subscribe(res => this.role = res)
    }

    showHomeMenu(...role) {
        if (role.includes(this.role)) {
          return true;
        } else {
          return false;
        }

        role.includes(this.role) ?true:false;
      }

}
