import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  constructor(
      private breadCrumbService: BreadcrumbService,

  ) { }

  ngOnInit() {
      this.breadCrumbService.setPath([
          {label: 'Course : ตารางคอร์ส', routerLink: '/courses'},
      ]);
  }

}
