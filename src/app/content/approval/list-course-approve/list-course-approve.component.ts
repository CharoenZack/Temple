import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService, ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {ApprovalService} from '../approval.service';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import {Router} from '@angular/router';
import {Course} from '../../../shared/interfaces/course';

@Component({
  selector: 'app-list-course-approve',
  templateUrl: './list-course-approve.component.html',
  styleUrls: ['./list-course-approve.component.scss']
})
export class ListCourseApproveComponent implements OnInit {
  cols: any[];
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
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.setColumn();
    this.setBreadCrumb();
    this.getData();
  }

  public loadData(e: LazyLoadEvent) {
    console.log(e);
    this.getData(e.rows);
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

  private getData(page?: number) {
    this.approvalService.getCoursesApproval().subscribe(res => {
      if (res['status'] === 'Success') {
        // this.courses = res['data'];
      }
    });

    this.courses = [
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
      {name: '1', conditionMin: 2, detail: 'qwerty'},
    ];

  }
}
