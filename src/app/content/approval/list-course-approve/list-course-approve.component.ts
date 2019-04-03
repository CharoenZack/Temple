import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService, ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {ApprovalService} from '../approval.service';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import {Course} from '../../../shared/interfaces/course';

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
    this.getData(e.first, e.rows);
  }

  // ngOnInit() {
  //   this.setColumn();
  //   this.setBreadCrumb();
  //   this.getData();
  // }

  // public loadData(e: LazyLoadEvent) {
  //   console.log(e);
  //   this.getData(e.rows);
  // }

  // private setColumn() {
  //   this.cols = [
  //     { field: 'name', header: 'ชื่อคอร์ส' },
  //     { field: 'conditionMin', header: 'หมายเหตุ' },
  //     { field: 'detail', header: 'รายละเอียด' },
  //   ];
  // }

  // private setBreadCrumb() {
  //   this.breadCrumbService.setPath([
  //     { label: 'Approval: การอนุมัติ', routerLink: '/approval' },
  //   ]);
  // }

  // onRowSelect(e) {
  //   console.log(e);
  // }

  // private getData(page?: number) {
  //   this.approvalService.getCoursesApproval().subscribe(res => {
  //     if (res['status'] === 'Success') {
  //       // this.courses = res['data'];
  //     }
  //   });

  //   this.courses = [
  //     { name: '1', conditionMin: 2, detail: 'qwerty' },
  //     { name: '2', conditionMin: 2, detail: 'qwerty' },
  //     { name: '3', conditionMin: 2, detail: 'qwerty' },
  //     { name: '4', conditionMin: 2, detail: 'qwerty' },
  //     { name: '5', conditionMin: 2, detail: 'qwerty' },
  //     { name: '6', conditionMin: 2, detail: 'qwerty' },
  //     { name: '7', conditionMin: 2, detail: 'qwerty' },
  //     { name: '8', conditionMin: 2, detail: 'qwerty' },
  //     { name: '9', conditionMin: 2, detail: 'qwerty' },
  //     { name: '10', conditionMin: 2, detail: 'qwerty' },
  //     { name: '11', conditionMin: 2, detail: 'qwerty' },
  //     { name: '12', conditionMin: 2, detail: 'qwerty' },
  //     { name: '13', conditionMin: 2, detail: 'qwerty' },
  //     { name: '14', conditionMin: 2, detail: 'qwerty' },
  //     { name: '15', conditionMin: 2, detail: 'qwerty' },
  //     { name: '16', conditionMin: 2, detail: 'qwerty' },
  //   ];

  // }

  public dataSources = [
        { name: '1', conditionMin: 2, detail: 'qwerty' },
        { name: '2', conditionMin: 2, detail: 'qwerty' },
        { name: '3', conditionMin: 2, detail: 'qwerty' },
        { name: '4', conditionMin: 2, detail: 'qwerty' },
        { name: '5', conditionMin: 2, detail: 'qwerty' },
        { name: '6', conditionMin: 2, detail: 'qwerty' },
        { name: '7', conditionMin: 2, detail: 'qwerty' },
        { name: '8', conditionMin: 2, detail: 'qwerty' },
        { name: '9', conditionMin: 2, detail: 'qwerty' },
        { name: '10', conditionMin: 2, detail: 'qwerty' },
        { name: '11', conditionMin: 2, detail: 'qwerty' },
        { name: '12', conditionMin: 2, detail: 'qwerty' },
        { name: '13', conditionMin: 2, detail: 'qwerty' },
        { name: '14', conditionMin: 2, detail: 'qwerty' },
        { name: '15', conditionMin: 2, detail: 'qwerty' },
        { name: '16', conditionMin: 2, detail: 'qwerty' },
      ];

  public courses: any[];
  public cols: any[];
  public totalRecords:number;
  public loading:boolean;

  ngOnInit(){
    this.totalRecords = this.dataSources.length

    this.cols = [
      { field: 'name', header: 'ชื่อคอร์ส' },
      { field: 'conditionMin', header: 'หมายเหตุ' },
      { field: 'detail', header: 'รายละเอียด' },
    ];

    this.loading = true

  }

  private getData(first = 0, rows = 10) {
    this.loading = true;
    this.approvalService.getCoursesApproval(first, rows).subscribe(res => {
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
