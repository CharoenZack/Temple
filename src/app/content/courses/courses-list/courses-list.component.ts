import {Component, OnInit} from '@angular/core';

import {CourseService} from '../shared/course.service';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {Course} from 'src/app/shared/interfaces/course';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  msgs: any[] = [];
  courses: Course[];
  cols: any[];
  checkapprove: boolean;

  public menu: MenuItem[];

  constructor(
    private course: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit() {
    this.getData();

    this.cols = [
      {field: 'stDate', header: 'วันที่'},
      {field: 'name', header: 'ชื่อคอร์ส'},
      {field: 'locationName', header: 'สถานที่'},
      {field: 'conditionMin', header: 'หมายเหตุ'},
      {field: 'status', header: 'สถานะ'},
    ];

    this.breadCrumbService.setPath([
      {label: 'Courses : ข้อมูลคอร์สทั้งหมด', routerLink: '/courses'},
    ]);
    this.checkapprove = false;
  }

  assignCourse(id) {
    this.confirmationService.confirm({
      message: 'ยืนยันการลงทะเบียน',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลงทะเบียนสำเร็จ'}];
        this.course.assignCourse(id).subscribe((res) => {
          console.log(res);

          if (res['result'] === 'Success') {
            const index = this.courses.findIndex(course => course.id === id);
            const upd = this.courses[index];
            upd.status = 2;
            this.courses = [
              ...this.courses.slice(0, index),
              upd,
              ...this.courses.slice(index + 1, )
            ];
          }
        });
      },
      reject: () => {
      }
    });
  }

  approvalCourse(id){
    this.confirmationService.confirm({
      message: 'ยืนยันการขออนุมัติพิเศษ',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ขออนุมัติพิเศษสำเร็จ'}];
        this.course.approvalCourse(id).subscribe((res) => {
          console.log(res);

          if (res['result'] === 'Success') {
            const index = this.courses.findIndex(course => course.id === id);
            const upd = this.courses[index];
            upd.status = 2;
            this.courses = [
              ...this.courses.slice(0, index),
              upd,
              ...this.courses.slice(index + 1, )
            ];
          }
        });
      },
      reject: () => {
      }
    });
  }


  private getData() {
    this.course.getCourses().subscribe(res => {
      if (res['status'] === 'Success') {
        this.courses = res['data'];
        console.log(this.courses);
      }
    });
  }

  checkSpecialApprove(){
    this.checkapprove = true;
  }

}
