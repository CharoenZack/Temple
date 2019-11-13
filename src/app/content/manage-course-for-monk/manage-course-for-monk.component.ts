import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../courses/shared/course.service';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-manage-course-for-monk',
  templateUrl: './manage-course-for-monk.component.html',
  styleUrls: ['./manage-course-for-monk.component.scss']
})
export class ManageCourseForMonkComponent implements OnInit {

  msgs: any[] = [];
  courses: Course[];
  cols: any[];
  public menu: MenuItem[];
  public totalRecords: number;
  public loading: boolean;

  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getTotalRecord();

    this.cols = [
      { field: 'stDate', header: 'วันที่' },
      { field: 'name', header: 'ชื่อคอร์ส' },
      { field: 'locationName', header: 'สถานที่' },
      { field: 'conditionMin', header: 'หมายเหตุ' },
    ];

    this.breadCrumbService.setPath([
      { label: 'จัดการคอร์ส', routerLink: '/manageCourseForMonk' },
    ]);
    this.loading = true;
  }
  deleteCourse(id) {
    this.confirmationService.confirm({
      message: 'คุณแน่ใจที่จะทำการปิดคอร์ส นักเรียนที่ขออนุมัติเข้าเรียนจะถูกยกเลิกและนักเรียนที่กำลังเรียนจะไม่ถูกอนุมัติให้ผ่านการเรียน',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.deleteCourse(id)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินงานสำเร็จ' }];
              const index = this.courses.findIndex(e => e.id === id);
              this.courses = [
                // ...this.courses
                ...this.courses.slice(0, index - 1),
                ...this.courses.slice(index + 1)
              ];
            } else {
              this.msgs = [{ severity: 'danger', summary: 'ข้อความจากระบบ', detail: 'การดำเนินงานไม่สำเร็จ' }];
            }
          }

          );

      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฎิเสธการทำการปิดคอร์ส'}];
      }
    });
  }
  showToast(key, detail) {
    this.messageService.clear();
    this.messageService.add(
      {
        key: key,
        sticky: true,
        summary: 'ข้อความจากระบบ',
        detail: detail
      }
    );
  }
  private getTotalRecord() {
    this.courseService.getTotalRecordForMonk().subscribe(res => {
      if (res['status'] === 'Success') {
        this.totalRecords = res['data'][0]['totalRecord'];
        console.log(this.totalRecords);

      }
    });
  }
  private getData(first = 0, rows = 10, query: string = '', mhcStatus: string = '') {
    this.loading = true;
    of([first, rows, query, mhcStatus]).pipe(
      switchMap(([firstCon, rowsCon, queryCon, mhcStatusCon]: [number, number, string, string]) =>
        this.courseService.getCourseWithOutUser(firstCon, rowsCon, queryCon, mhcStatusCon))

    ).subscribe(res => {
      console.log(res);

      if (res['status'] === 'Success') {
        this.courses = res['data'];

        this.loading = false;
      }
    });
  }
  public loadData(e: LazyLoadEvent) {
    console.log(e);
    let query = '';
    if (e.globalFilter) {
      query = e.globalFilter;
    }
    this.getData(e.first, e.rows, query);


  }
}


