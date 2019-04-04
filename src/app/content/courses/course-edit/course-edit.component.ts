import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../shared/course.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public courseId: string;
  public formEdit: FormGroup;
  public noticearr = [1,2,3,4,5,6,7,8,9,10]
  public notice: Array<any> = [];
  public location:Location[];

  constructor(
      private breadCrumbService: BreadcrumbService,
      private formBuilder: FormBuilder,
      private courseService: CourseService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initNotice()

    this.courseId = this.route.snapshot.paramMap.get('id');
    this.breadCrumbService.setPath([
      { label: 'EditCourse : สร้างคอร์ส', routerLink: '/editCourse' },
    ]);
    this.createForm();
    this.settingForm();
  }

  private initNotice(){
    this.noticearr.map(res =>{
      this.notice.push({id:res})
    })

  }
  createForm() {
    this.formEdit = this.formBuilder.group(
      {
        
        name: ['', Validators.required],
        detail: ['', Validators.required],
        conditionMin: ['', Validators.required],
        location: ['', Validators.required],
        teacher: ['', [Validators.required]],
      }
    );
  }

  settingForm() {
    this.courseService.getCourseById(this.courseId)
      .subscribe(res => {
        
        const teacher ={
          id: res['data']['id'],
          name: res['data']['fname']
        }
        const location = {
          id: res['data']['id'],
          name: res['data']['name']
        }

        this.formEdit.controls['name'].setValue(res['data']['name']);
        this.formEdit.controls['detail'].setValue(res['data']['detail']);
        this.formEdit.controls['location'].patchValue(location)
        this.formEdit.controls['teacher'].patchValue(teacher)
        },
        err => console.log(err['error']['message'])
      );
  }

  onSubmit(e) {
    e.preventDefault();
    const date = this.formEdit.get('date').value;
    const datesort = date.map( res => formatDate(res,"yyyy-MM-dd",'en')).sort();
    const course = {
        name: this.formEdit.get('courseName').value,
        detail: this.formEdit.get('detail').value,
        locationId: this.formEdit.get('location').value.id,
        conditionMin: this.formEdit.get('conditionMin').value.id,
        date:datesort,
        teacher:this.formEdit.get('teachers').value[0].id
      };
      this.courseService.editCourse(this.courseId,course).subscribe(
        res => {
          console.log(res);

        },
        err => {
          console.log(err['error']['message']);
        }
      );
  }
}
