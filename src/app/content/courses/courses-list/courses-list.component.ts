import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { TransportationsService } from './../../../shared/service/transportations.service';
import { Component, OnInit } from '@angular/core';

import { CourseService } from '../shared/course.service';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { Course } from '../../../shared/interfaces/course';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { SpecialApprove } from '../../../shared/interfaces/special-approve';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public msgs: any[] = [];
  public courses: Course[];
  public courses2: Course[];
  public courses3: Course[];
  public cols: any[];
  public transportations: any[];
  public menu: MenuItem[];
  public displayDialog = false;
  public displayDialogmhc = false;
  public displayStatus = false;
  public specialApprove: SpecialApprove;
  public sensations: any;
  public selectedCourse: Course;
  public totalRecords: number;
  public TotalCourseStudy: number;
  public TotalCourseNotPass: number;
  public loading: boolean;
  public cStatus: any;
  public coursesTemp: Course[];
  public values: Course[] = [];
  public totalRecordPass = 0;

  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
    private transportationsService: TransportationsService
  ) {
  }

  ngOnInit() {
    this.initSpecialApprove();
    this.getTotalRecord();
    this.getDataStudies();
    this.getTotalCourseGraduated();
    this.getTotalCourseStudy();
    this.getTotalCoursNotPass();
    // ตารางการเดินทาง
    this.transportationsService.getTransportations().subscribe(
      res => {
        this.transportations = [
          ...res
        ];
      },
      err => {
        console.log(err['error']['message']);
      }
    );
    this.initSensations();
    this.cols = [
      { field: 'stDate', header: 'วันที่ปฏิบัติธรรม' },
      { field: 'name', header: 'ชื่อคอร์ส' },
      { field: 'locationName', header: 'สถานที่' },
      { field: 'conditionMin', header: 'หมายเหตุ' },
      { field: 'status', header: 'สถานะ' },
    ];

    this.breadCrumbService.setPath([
      { label: 'ข้อมูลคอร์สทั้งหมด', routerLink: '/courses' },
    ]);
  }

  // Lazyload
  public loadData(e: LazyLoadEvent) {
    let query = '';
    if (e.globalFilter) {
      query = e.globalFilter;
    }
    this.getData(e.first, e.rows, query);
  }

  public loadData1(e: LazyLoadEvent) {
    let query = '';
    if (e.globalFilter) {
      query = e.globalFilter;
    }
    this.getDataStudies(e.first, e.rows, query, '2');
  }

  // register_course
  public assignCourse(id) {
    this.sensations.tranId = id;
    console.log(this.sensations);
    this.confirmationService.confirm({
      message: 'ยืนยันการลงทะเบียน',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.courseService.assignCourse(this.sensations).subscribe((res) => {
          console.log(res);
          if (res['result'] === 'Success') {
            const index = this.courses.findIndex(course => course.id === this.sensations.courseId);
            console.log(id);
            const upd = this.courses[index];
            upd.status = 'กำลังศึกษา';
            upd.canRegister = 0;
            upd.mhcStatus = '2';
            this.updateTable([
              ...this.courses.slice(0, index),
              upd,
              ...this.courses.slice(index + 1)
            ]);
            this.initSensations();
            this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลงทะเบียนสำเร็จ' }];
            this.getData(0, 5, '', '');
          } else if (res['result'] === 'Fail') {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
          }
        },
        err => {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: err.error['errorMessage'] }];
          this.displayDialogmhc = false;
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการลงทะเบียน'}];

      }
    });
  }
  // ขออนุมัติ
  public approvalCourse(id) {
    this.specialApprove.tranId = id;
    console.log(this.specialApprove);
    this.confirmationService.confirm({
      message: 'ยืนยันการขออนุมัติพิเศษ',
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
            this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ขออนุมัติพิเศษสำเร็จ' }];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
          }
        },
        err => {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: err.error['errorMessage'] }];
          this.displayDialog = false;
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
  }
  // ข้อมูลจาก Database
  private getDataStudies(first = 0, rows = 10, query: string = '', mhcStatus = '') {
    this.loading = true;
    of([first, rows, query, mhcStatus]).pipe(
      switchMap(([firstCon, rowsCon, queryCon]: [number, number, string]) =>
        this.courseService.getCourses(firstCon, rowsCon, queryCon, '2'))
    ).subscribe(res => {
      if (res['status'] === 'Success') {
        if (mhcStatus === '2' ) {
          this.courses2 = res['data'];
          console.log(this.courses2);
        }
        this.loading = false;
      }
    });
  }

  // ข้อมูลจาก Database
  private getDataNotPass(first = 0, rows = 10, query: string = '', mhcStatus = '') {
    this.loading = true;
    of([first, rows, query, mhcStatus]).pipe(
      switchMap(([firstCon, rowsCon, queryCon]: [number, number, string]) =>
        this.courseService.getCoursesNotPass(firstCon, rowsCon, queryCon, '0'))
    ).subscribe(res => {
      if (res['status'] === 'Success') {
        if ( mhcStatus === '0') {
          this.courses3 = res['data'];
          console.log(this.courses3);
        }
        this.loading = false;
      }
    });
  }

  private getData(first = 0, rows = 10, query: string = '', mhcStatus = '') {
    this.values = [];
    this.loading = true;
    of([first, rows, query, mhcStatus]).pipe(
      switchMap(([firstCon, rowsCon, queryCon, mhcStatusCon]: [number, number, string, string]) =>
        this.courseService.getCourses(firstCon, rowsCon, queryCon, mhcStatusCon))
    ).subscribe(res => {
      if (res['status'] === 'Success') {
        res['data'].forEach(element => {
          if (element.status === 'ยังไม่ได้ลงทะเบียน' || element.status === 'รอการอนุมัติ') {
            this.values.push(element);
          }
          this.courses = this.values;
        });
        this.loading = false;
      }
    });
  }
  // จำนวนคอร์ส
  private getTotalRecord() {
    this.courseService.getTotalRecord().subscribe(res => {
      if (res['status'] === 'Success') {
        this.totalRecords = res['data'][0]['totalRecord'];
      }
    });
  }
  // คอร์สที่กำลังศึกษา status = 2 (กำลังศึกษา) status = 1 (ผ่าน)
  private getTotalCourseStudy() {
    this.courseService.getTotalCourseStudy('2').subscribe(res => {
      if (res['status'] === 'Success') {
        this.TotalCourseStudy = res['data'][0]['totalRecord'];
      }
    });
  }

  private getTotalCoursNotPass() {
    this.courseService.getTotalCourseStudy('0').subscribe(res => {
      if (res['status'] === 'Success') {
        this.TotalCourseNotPass = res['data'][0]['totalRecord'];
      }
    });
  }

  checkCourseDate() {
    this.courseService.getTotalCourseStudy('2').subscribe(res => {
      if (res['status'] === 'Success') {
        res['data'].forEach(element => {
          if (element.stDate ) {

          }
        });

      }
    })
  }

  // ยกเลิกขออนุมัติ
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
            this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ยกเลิกการขออนุมัติพิเศษสำเร็จ' }];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
  }
  // specialApprove
  public saCourse(courseId: number) {
    this.displayDialog = true;
    this.specialApprove.courseId = courseId;
  }
  // Sesations
  public mhcCourse(courseId: number) {
    this.displayDialogmhc = true;
    this.sensations.courseId = courseId;
    // this.assignCourse(courseId);
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
      tranId: null,
      senseExpected: null,
      senseExperience: null,
    }
      ;
  }
  // Dialog การเดินทางข้อมูลเสริม
  private initSensations() {
    this.displayDialogmhc = false;
    this.sensations = {
      courseId: null,
      tranId: null,
      senseExpected: null,
      senseExperience: null,
    }
      ;
  }

  private updateTable(data: any[]) {
    this.courses = data;
  }

  public onRowSelect(e) {
    const course: Course = e.data;
    this.router.navigate(['/courses', course.id]);
  }
  // tabView
  getTabViewStatus(event) {
    this.msgs = [];
    if (event.index === 0) {
      this.getData(0, 5, '', '');
    } else if (event.index === 1) {
      this.getDataStudies(0, 5, '', '2');
    } else if (event.index === 2) {
      this.getDataNotPass(0, 5, '', '0');
    }
  }
  private getTotalCourseGraduated() {
    this.courseService.getTotalCourseGraduated('1').subscribe(res => {
      console.log(res['data'][0]['getTotalCourseGraduated']);
      console.log(res);
      if (res['status'] === 'Success') {
        this.totalRecordPass = res['data'][0]['totalRecord'];
        console.log('999' + this.totalRecordPass);
      }
    });
  }

  public cancelDialog(cancel, model: NgModel) {
    if (cancel === '1') {
      this.displayDialogmhc = false;
      this.initSensations();
    } else if (cancel === '2') {
      this.displayDialog = false;
      this.initSpecialApprove();
    }
    model.control.markAsUntouched();
    model.control.markAsPristine();
  }

}
