import { Component, OnInit, ViewChild, SimpleChanges, Input, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { isNgTemplate } from '@angular/compiler';
import { ApproveForMember } from 'src/app/shared/interfaces/approve-for-member';
import { ManagePassCourseService } from 'src/app/shared/service/manage-pass-course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-pass-course-form',
  templateUrl: './manage-pass-course-form.component.html',
  styleUrls: ['./manage-pass-course-form.component.css']
})
export class ManagePassCourseFormComponent implements OnInit {

  @Input() option: String;
  @Input() member: ApproveForMember[];
  @Input() cols: any[];
  @Input() fieldId: string
  @Output() listData;
  public courseId: string;




  constructor(
    private breadCrumbService: BreadcrumbService,
    private managePassCourse: ManagePassCourseService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.option = "1";
    this.fieldId = "mhcId"
    this.breadCrumbService.setPath([
      { label: 'Manage Pass Course: จัดการการอนุมัติผู้เรียน' },
      { label: 'Manage Pass Course: จัดการการอนุมัติผู้เรียน' },
    ]);

    this.cols = [
      { field: 'fullname', header: 'ชื่อ-นามสกุล' },
    ];

    this.courseId = this.route.snapshot.paramMap.get("id")
    this.initMember();


  }

  initMember() {
    this.managePassCourse.getMemberInCourse(+this.courseId)
      .subscribe(res => {
        if (res['status'] === 'Success')
          this.member = res['data'];
      })
  }

  getData(e) {
    const data = {
      mhcList: [
        ...e.member
      ],
      cId: e.courseId,
    }

    this.managePassCourse.updateMemberPassCourse(data)
      .subscribe(res => {
        console.log(res);
        
        if (res['status'] === 'Success') {
          this.initMember();
        }
      })
  }



}
