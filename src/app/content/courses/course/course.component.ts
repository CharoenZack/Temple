import { Component, OnInit } from '@angular/core';

import { CourseService } from '../shared/course.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

    course: Course;
    msgs: any[] = [];
    public menu: MenuItem[];

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private confirmationService: ConfirmationService,
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
            { label: 'Course : ตารางคอร์ส', routerLink: '/courses' },
        ]);
    }
    assignCourse(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log(this);

                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
                this.courseService.assignCourse(id).subscribe(function (res) {
                    if (res['status'] === 'Success') {
                        this.courses = res['data'];
                    }
                });
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        });
    }
    approvalCourse(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log(this);

                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
                //   this.courseService.approvalCourse(id).subscribe(function (res) {
                //     if (res['status'] === 'Success') {
                //       this.courses = res['data'];
                //     }
                //   });
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        });
    }

}
