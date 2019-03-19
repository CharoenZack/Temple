import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public userId:String;

    constructor(
        private breadCrumbService: BreadcrumbService,
    ) {
    }

    ngOnInit() {
        this.breadCrumbService.clearPath();
        this.userId = localStorage.getItem('userId');
    }

}
