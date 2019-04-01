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
    courses: Course[];
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
            message: 'ยืนยันการลงทะเบียน',
            header: 'ข้อความจากระบบ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.courseService.assignCourse(id).subscribe((res) => {
                    console.log(res);

                    if (res['result'] === 'Success') {
                        this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลงทะเบียนสำเร็จ' }];
                        const index = this.courses.findIndex(course => course.id === id);
                        const upd = this.courses[index];
                        upd.status = 2;
                        this.courses = [
                            ...this.courses.slice(0, index),
                            upd,
                            ...this.courses.slice(index + 1)
                        ];
                    } else if (res['result'] === 'Fail') {
                        this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
                    }
                });
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ยกเลิกการลงเทียน' }];

            }
        });
    }
    approvalCourse(id) {
        this.confirmationService.confirm({
            message: 'ยืนยันการขออนุมัติพิเศษ',
            header: 'ข้อความจากระบบ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.courseService.approvalCourse(id).subscribe((res) => {
                    console.log(res);

                    if (res['result'] === 'Success') {
                        this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ขออนุมัติพิเศษสำเร็จ' }];
                        const index = this.courses.findIndex(course => course.id === id);
                        const upd = this.courses[index];
                        upd.status = 2;
                        this.courses = [
                            ...this.courses.slice(0, index),
                            upd,
                            ...this.courses.slice(index + 1)
                        ];
                        this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ขออนุมัติพิเศษสำเร็จ' }];
                    } else if (res['result'] === 'Fail') {
                        this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
                    }
                });
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ยกเลิกการขออนุมัติพิเศษ' }];
            }
        });
    }

}
