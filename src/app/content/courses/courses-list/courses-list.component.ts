import { Component, OnInit } from '@angular/core';

import { CourseService } from '../shared/course.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  msgs: any[] = [];
  courses: Course[];
  cols: any[];
  public menu: MenuItem[];

  constructor(
    private course: CourseService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.course.getCourses().subscribe(res => {
      console.log(res);

      if (res['status'] === 'Success') {
        this.courses = res['data'];
      }
    });


    this.cols = [
      { field: 'stDate', header: 'วันที่' },
      { field: 'name', header: 'ชื่อคอร์ส' },
      { field: 'locationName', header: 'สถานที่' },
      { field: 'conditionMin', header: 'หมายเหตุ' },
    ]
    this.menu = [
      { label: '',icon:"pi pi-home",url:'/'},
      { label: 'Courses : ข้อมูลคอร์สทั้งหมด' },
    ];
  }
  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

}
