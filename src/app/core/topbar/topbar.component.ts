import { AuthGuard } from './../../shared/guard/auth.guard';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { Member } from 'src/app/shared/interfaces/member';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    public isLoggedIn: boolean;
    public userData: Member;
    public userDisplayName1 = '';

    public userDisplayName = new Subject<any>();
    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private manageUser: ManageUserService,
        private authGuard: AuthGuard
    ) {
    }

    ngOnInit() {
        this.authService.isLoggedIn().subscribe(res => this.isLoggedIn = res);
        this.authService.isLoggedIn().subscribe(res => this.getData());
        // this.userDisplayName.next(this.authGuard.username.next());
        // this.getData();
    }

    logout() {
        this.authService.logout();
        this.userDisplayName1 = '';
    }

     getData() {
        this.userDisplayName1 = localStorage.getItem('username');

    }
}
