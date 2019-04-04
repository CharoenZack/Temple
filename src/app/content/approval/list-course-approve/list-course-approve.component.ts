import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService, ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {ApprovalService} from '../approval.service';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import {Course} from '../../../shared/interfaces/course';
import {of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-list-course-approve',
  templateUrl: './list-course-approve.component.html',
  styleUrls: ['./list-course-approve.component.scss']
})
export class ListCourseApproveComponent implements OnInit {
  public cols: any[];
  public courses: Course[];
  public menu: MenuItem[];
  public totalRecords: number;
  public loading: boolean;
  public selectedCourse: Course;

  constructor(
    private approvalService: ApprovalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.setColumn();
    this.setBreadCrumb();
    this.getTotalRecord();
  }

  public loadData(e: LazyLoadEvent) {
    console.log(e);
    let query = '';
    if (e.globalFilter) {
      query = e.globalFilter;
    }
    this.getData(e.first, e.rows, query);
  }

  private setColumn() {
    this.cols = [
      {field: 'name', header: 'ชื่อคอร์ส'},
      {field: 'conditionMin', header: 'หมายเหตุ'},
      {field: 'detail', header: 'รายละเอียด'},
    ];
  }

  private setBreadCrumb() {
    this.breadCrumbService.setPath([
      {label: 'Approval: การอนุมัติ', routerLink: '/approval'},
    ]);
  }

  onRowSelect(e) {
    console.log(e);
  }

  private getData(first = 0, rows = 10, query: string = '') {
    this.loading = true;
    of([first, rows, query]).pipe(
      switchMap(([firstCon, rowsCon, queryCon]: [number, number, string]) =>
        this.approvalService.getCoursesApproval(firstCon, rowsCon, queryCon))
    ).subscribe(res => {
      if (res['status'] === 'Success') {
        this.courses = res['data'];
        this.loading = false;
      }
    });
  }

  private getTotalRecord() {
    this.approvalService.getTotalRecord().subscribe(res => {
      if (res['status'] === 'Success') {
        this.totalRecords = res['data'][0]['totalRecord'];
      }
    });
  }
}
