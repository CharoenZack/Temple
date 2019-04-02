import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { CourseService } from '../courses/shared/course.service';

@Component({
  selector: 'app-manage-pass-course',
  templateUrl: './manage-pass-course.component.html',
  styleUrls: ['./manage-pass-course.component.scss']
})
export class ManagePassCourseComponent implements OnInit {


  constructor(
    private breadCrumbService : BreadcrumbService,
    private coureseService : CourseService,
  ) { }

  ngOnInit() {
    this.breadCrumbService.setPath([
      {label: 'Manage Pass Course: จัดการการอนุมัติผู้เรียน'},
    ]);
  }



}
