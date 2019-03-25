import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {Course} from 'src/app/shared/interfaces/course';
import { CourseService } from '../courses/shared/course.service';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {

  msgs: any[] = [];
  courses: Course[];
  cols: any[];
  public menu: MenuItem[];

  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(res => {
      if (res['status'] === 'Success') {
        this.courses = res['data'];
      }
    });

    this.cols = [
      {field: 'stDate', header: 'วันที่'},
      {field: 'name', header: 'ชื่อคอร์ส'},
      {field: 'locationName', header: 'สถานที่'},
      {field: 'conditionMin', header: 'หมายเหตุ'},
    ];

    this.breadCrumbService.setPath([
      // {label: 'Courses : ข้อมูลคอร์สทั้งหมด', routerLink: '/courses'},
    ]);
  }
  createCourse(){
    // this.courseService.createCourse.subscribe(function (res) {
    //   if (res['status'] === 'Success') {
    //     this.courses = res['data'];
    //   }
    // });
  }

  editCourse(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this);

        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        // this.courseService.editCourse(id).subscribe(function (res) {
        //   if (res['status'] === 'Success') {
        //     this.courses = res['data'];
        //   }
        // });
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }
  deleteCourse(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this);

        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        // this.courseService.deleteCourse(id).subscribe(function (res) {
        //   if (res['status'] === 'Success') {
        //     this.courses = res['data'];
        //   }
        // });
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }
}
