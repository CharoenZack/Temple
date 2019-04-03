import {Component, OnInit} from '@angular/core';

import {CourseService} from '../shared/course.service';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {Course} from '../../../shared/interfaces/course';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import {SpecialApprove} from '../../../shared/interfaces/special-approve';
import {Router} from '@angular/router';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public msgs: any[] = [];
  public courses: Course[];
  public cols: any[];
  public menu: MenuItem[];
  public displayDialog = false;
  public specialApprove: SpecialApprove;
  public selectedCourse: Course;

  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getData();
    this.initSpecialApprove();
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
  }

  public assignCourse(id) {
    this.confirmationService.confirm({
      message: 'ยืนยันการลงทะเบียน',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.assignCourse(id).subscribe((res) => {
          console.log(res);
          if (res['result'] === 'Success') {
            const index = this.courses.findIndex(course => course.id === id);
            const upd = this.courses[index];
            upd.status = 'กำลังศึกษา';
            upd.canRegister = 0;
            upd.mhcStatus = '2';
            this.updateTable([
              ...this.courses.slice(0, index),
              upd,
              ...this.courses.slice(index + 1)
            ]);
            this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลงทะเบียนสำเร็จ'}];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage']}];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการลงเทียน'}];

      }
    });
  }

  public approvalCourse() {
    this.confirmationService.confirm({
      message: 'ยืนยันการยกเลิกการขออนุมัติพิเศษ',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.specialApprove);
        this.courseService.approvalCourse(this.specialApprove).subscribe((res) => {
          console.log(res);

          if (res['result'] === 'Success') {
            const index = this.courses.findIndex(course => course.id === this.specialApprove.courseId);
            const upd = this.courses[index];
            upd.status = 'รอการอนุมัติ';
            upd.saStatus = '2';
            upd.canRegister = 0;
            this.updateTable([
              ...this.courses.slice(0, index),
              upd,
              ...this.courses.slice(index + 1)
            ]);

            this.initSpecialApprove();
            this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ขออนุมัติพิเศษสำเร็จ'}];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage']}];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
  }


  private getData() {
    this.courseService.getCourses().subscribe(res => {
      if (res['status'] === 'Success') {
        this.courses = res['data'];
        console.log(this.courses);
      }
    });
  }


  public cancelApprovalCourse(id) {
    this.confirmationService.confirm({
      message: 'ยืนยันการยกเลิกการขออนุมัติพิเศษ',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.cancelApprovalCourse(id).subscribe((res) => {
          console.log(res);
          if (res['result'] === 'Success') {
            const index = this.courses.findIndex(course => course.id === id);
            const upd = this.courses[index];
            upd.status = 'ยังไม่ได้ลงทะเบียน';
            upd.canRegister = 1;
            upd.saStatus = null;
            this.updateTable([
              ...this.courses.slice(0, index),
              upd,
              ...this.courses.slice(index + 1)
            ]);
            this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ยกเลิกการขออนุมัติพิเศษสำเร็จ'}];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage']}];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
  }

  public saCourse(courseId: number) {
    this.displayDialog = true;
    this.specialApprove.courseId = courseId;
  }

  private initSpecialApprove() {
    this.displayDialog = false;
    this.specialApprove = {
      specialApproveId: null,
      courseId: null,
      memberId: null,
      detail: '',
      status: '',
      createDate: null,
      lastUpdate: null,
      courseName: null,
    }
    ;
  }

  private updateTable(data: any[]) {
    this.courses = data;
  }

  public onRowSelect(e) {
    const course: Course = e.data;
    this.courseService.setCourse(course);
    this.router.navigate(['/courses', course.id]);
  }
}
