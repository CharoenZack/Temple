import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
    public title = 'ข้อมูลส่วนตัว';
    public personalId: String;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private breadCrumbService: BreadcrumbService
    ) {
    }

    ngOnInit() {
        this.personalId = this.route.snapshot.paramMap.get('id');
        this.breadCrumbService.setPath([
            {label: 'Profile : ข้อมูลส่วนตัว'},
        ]);
    }

    editPersonal() {
        this.router.navigateByUrl(`/profile/${this.personalId}/edit`);
    }

}
