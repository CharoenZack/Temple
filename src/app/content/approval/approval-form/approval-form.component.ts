import { Component, OnInit, Input, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { MemberApproval } from 'src/app/shared/interfaces/member-approval';
import { ActivatedRoute } from '@angular/router';
import { ApprovalService } from '../approval.service';

import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.scss']
})
export class ApprovalFormComponent implements OnInit {

  @Input() option: String;
  @Input() member: MemberApproval[];
  @Input() cols: any[];
  @Input() fieldId: string;
  @Input() course: any[];
  @Output() listData;
  @Input() msgs: Message[] = [];
  public courseId: string;
  public nameCourse: string;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private approvalService: ApprovalService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.option = '2';
    this.fieldId = 'specialApproveId';
    this.breadCrumbService.setPath([
      { label: 'การอนุมัติ', routerLink: '/approval' },
      { label: 'อนุมัติผู้เรียน' },
    ]);

    this.cols = [
      { field: 'displayName', header: 'ชื่อ-นามสกุล' },
    ];

    this.courseId = this.route.snapshot.paramMap.get('id');
    this.initMember();

    this.nameCourse = this.route.snapshot.queryParamMap.get('course');
    console.log('1');
  }


  initMember() {
    console.log('2');

    this.approvalService.getMemberForApprove(+this.courseId)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.member = res['data'];
          console.log(res);

          if (this.member.length === 0) {
            this.member = [{ displayName: 'ไม่มีข้อมูล' }];
          }
        }
      });
  }
  showDialog(e) {
    console.log('3');
    console.log(e);
    this.confirmationService.confirm({
      message: 'ต้องการอนุมัติ',
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.approvalService.approveStudents(e)
          .subscribe((res) => {
            console.log(res);

            if (res['status'] === 'Success') {
              this.initMember();
              this.msgs = [{ severity: 'success', summary: 'การ' + 'อนุมัติสำเร็จ', detail: '' }];
            } else {
              this.msgs = [{ severity: 'error', summary: 'การ' + 'อนุมัติไม่สำเร็จ', detail: '' }];
            }
          },
          err => {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: err.error['errorMessage'] }];
          });
      },
      reject: () => {

      }
    });
  }

}
