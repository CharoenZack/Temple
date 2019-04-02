import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  public formEdit: FormGroup;
  public courses:Course[];

  constructor(
    private breadCrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.breadCrumbService.setPath([
      { label: 'CreateCourse : สร้างคอร์ส', routerLink: '/createCourse' },
    ]);
  }
  createForm() {
    this.formEdit = this.formBuilder.group(
      {
        courseName: ['', Validators.required],
        detail: ['', Validators.required],
        location: ['', Validators.required],
        stDate: ['', Validators.required],
        annotation: ['', Validators.required],
      }
    );
  }
}
