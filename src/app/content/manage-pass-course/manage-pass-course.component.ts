import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { Course } from 'src/app/shared/interfaces/course';
import { MenuItem, MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ApprovalService } from '../approval/approval.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ManagePassCourseService } from 'src/app/shared/service/manage-pass-course.service';

@Component({
  selector: 'app-manage-pass-course',
  templateUrl: './manage-pass-course.component.html',
  styleUrls: ['./manage-pass-course.component.scss']
})
export class ManagePassCourseComponent implements OnInit {

  public cols: any[];
  public courses: Course[];
  public menu: MenuItem[];
  public totalRecords: number;
  public loading: boolean;
  public selectedCourse: Course;
  public courseId: string;

  private totalRec: number;

  constructor(
    private managePassCourse: ManagePassCourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.setColumn();
    this.getTotalRecord();

    this.breadCrumbService.setPath([
      { label: 'จัดการผ่านหลักสูตร' },
    ]);
  }

  private setColumn() {
    this.cols = [
      { field: 'name', header: 'ชื่อคอร์ส' },
      { field: 'detail', header: 'รายละเอียด' },
      { field: 'numberOfMembers', header: 'จำนวนนักเรียน' },
    ];
  }

  onRowSelect(e) {
    this.router.navigateByUrl(`/managepasscourse/${e.data.id}?course=${e.data.name}`);
  }

  private getData(first = 0, rows = 10, query: string = '') {
    this.loading = true;
    of([first, rows, query]).pipe(
      switchMap(([firstCon, rowsCon, queryCon]: [number, number, string]) =>
        this.managePassCourse.getAllCourse(firstCon, rowsCon, queryCon))
    ).subscribe(res => {
      console.log(res);

      if (res['status'] === 'Success') {
        this.courses = res['data'];
        this.loading = false;
      }
    });
  }

  // private initMember() {
  //   this.managePassCourse.getMemberInCourse(+this.courseId)
  //   .subscribe(res => {
  //     if(res['status'] === 'Success') {

  //     }
  //   })
  // }
  private getTotalRecord() {
    this.managePassCourse.getTotalRecord().subscribe(res => {
      if (res['status'] === 'Success') {
        this.totalRecords = res['data'][0]['totalRecord'];
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
