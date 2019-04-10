import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';

@Component({
  selector: 'app-manage-pass-course',
  templateUrl: './manage-pass-course.component.html',
  styleUrls: ['./manage-pass-course.component.scss']
})
export class ManagePassCourseComponent implements OnInit {


  constructor(
    private breadCrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit() {
    this.breadCrumbService.setPath([
      {label: 'Manage graduated: จัดการผ่านหลักสูตร'},
    ]);
  }


}
