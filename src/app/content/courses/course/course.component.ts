import {Component, OnInit} from '@angular/core';

import {CourseService} from '../shared/course.service';
import {ActivatedRoute} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

    course: Course;
    public menu: MenuItem[];

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private breadCrumbService: BreadcrumbService,
    ) {
    }

    ngOnInit() {
        this.course = {};
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        this.courseService.getCourse(id)
            .subscribe(res => {
                if (res['status'] === 'Success') {
                    this.course = res['data'];
                    console.log(this.course);
                }
            });

        this.breadCrumbService.setPath([
            {label: 'Course : ตารางคอร์ส', routerLink: '/courses'},
        ]);
    }


}
