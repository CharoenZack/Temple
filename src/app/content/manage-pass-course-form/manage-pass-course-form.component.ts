import { Component, OnInit, Input, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { ApproveForMember } from 'src/app/shared/interfaces/approve-for-member';
import { ManagePassCourseService } from 'src/app/shared/service/manage-pass-course.service';
import { ActivatedRoute } from '@angular/router';

import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-manage-pass-course-form',
  templateUrl: './manage-pass-course-form.component.html',
  styleUrls: ['./manage-pass-course-form.component.css']
})
export class ManagePassCourseFormComponent implements OnInit {

  @Input() option: String;
  @Input() member: ApproveForMember[];
  @Input() cols: any[];
  @Input() fieldId: string;
  @Output() listData;
  @Input() msgs: Message[] = [];
  public courseId: string;
  public nameCourse: string;


  constructor(
    private breadCrumbService: BreadcrumbService,
    private managePassCourse: ManagePassCourseService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit() {
    this.option = '1';
    this.fieldId = 'mhcId';
    this.breadCrumbService.setPath([
      { label: 'จัดการการอนุมัติผู้เรียน', routerLink: '/managepasscourse' },
      { label: 'จัดการผู้เรียน' },
    ]);

    this.cols = [
      { field: 'fullname', header: 'ชื่อ-นามสกุล' },
    ];

    this.courseId = this.route.snapshot.paramMap.get('id');
    this.initMember();

    this.nameCourse = this.route.snapshot.queryParamMap.get('course');
  }

  initMember() {
    this.managePassCourse.getMemberInCourse(+this.courseId)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.member = res['data'];
        }

      });
  }

  setMemberPassCourse(e) {
    const data = {
      mhcList: [
        ...e.member
      ],
      cId: e.courseId,
    };
    return this.managePassCourse.updateMemberPassCourse(data);
  }

  showDialog(e) {
    this.confirmationService.confirm({
      message: 'คุณต้องการดำเนินการใช่หรือไม่',
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.setMemberPassCourse(e)
          .subscribe((res) => {
            console.log(res);
            if (res['status'] === 'Success') {
              this.initMember();
              this.msgs = [{ severity: 'success', summary: 'การดำเนินการสำเร็จ', detail: '' }];
            } else {
              this.msgs = [{ severity: 'error', summary: 'การดำเนินไม่สำเร็จ', detail: '' }];
            }
          });
      },
      reject: () => {

      }
    });
  }


}
