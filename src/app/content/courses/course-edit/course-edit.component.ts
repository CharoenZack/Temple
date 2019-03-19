import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  constructor(
      private breadCrumbService: BreadcrumbService,

  ) { }

  ngOnInit() {
      this.breadCrumbService.setPath([
          {label: 'Approval: การอนุมัติ', routerLink: '/approval'},
      ]);
  }

}
