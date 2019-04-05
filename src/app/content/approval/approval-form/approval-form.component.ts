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
  @Input() fieldId: string
  @Input() course: any[];
  @Output() listData;
  public courseId: string;
  @Input() msgs: Message[] = [];

  constructor(
    private breadCrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private approvalService: ApprovalService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.option = "2";
    this.fieldId = "specialApproveId"
    this.breadCrumbService.setPath([
      { label: 'Approval: การอนุมัติ',url:'/approval' },
      { label: 'Approval students: อนุมัติผู้เรียน' },
    ]);

    this.cols = [
      { field: 'displayName', header: 'ชื่อ-นามสกุล' },
    ];

    this.courseId = this.route.snapshot.paramMap.get("id")
    this.initMember();

  }

  initMember() {
    this.approvalService.getMemberForApprove(+this.courseId)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.member = res['data'];
          if(this.member.length===0){
            this.member = [{displayName:"ไม่มีข้อมูล"}]
          }
        }
      })
  }

  showDialog(e) {
    const message = e.status === "1" ? "" : "ไม่";
    this.confirmationService.confirm({
      message: message+"ต้องการอนุมัติ",
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.approvalService.approveStudents(e)
      .subscribe((res) => {
        console.log(res);
        
        if (res['status'] === "Success") {
          this.initMember();
          this.msgs = [{ severity: 'success', summary: "การ"+message+"อนุมัติสำเร็จ", detail: '' }];
        }else{
          this.msgs = [{ severity: 'error', summary: "การ"+message+"อนุมัติไม่สำเร็จ", detail: '' }];
        }
      })   
      },
      reject: () => {
        
      }
    });
  }

}
