import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../shared/course.service';
import { formatDate, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public courseId: string;
  public formEdit: FormGroup;
  public noticearr = ['0','1','2','3','4','5','6','7','8','9','10']
  public notice: Array<any> = [];
  public location:Location[];
  public filteredTeacher: any[];
  public teachers:any[];
  public teacher:any;
  public pipe = new DatePipe('th-TH')
  public yearRange: string;

  constructor(
      private breadCrumbService: BreadcrumbService,
      private formBuilder: FormBuilder,
      private courseService: CourseService,
      private route: ActivatedRoute,
      private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.initNotice()

    this.courseId = this.route.snapshot.paramMap.get('id');
    this.breadCrumbService.setPath([
      { label: 'ManageCourse : ตารางคอร์ส', routerLink: '/manageCourse' },
      { label: 'EditCourse : สร้างคอร์ส', routerLink: '/editCourse' },
    ]);
    this.locationService.getLocation().subscribe( 
      res => {
        if(res.status == 'Success'){
          this.location = res.data;
        }    
      },
      error =>{
        console.log(error['error']['message']);
        
      }
    ) 
    const currentYear = this.pipe.transform(Date.now(),'yyyy');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
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
        
        courseName: ['', Validators.required],
        detail: ['', Validators.required],
        conditionMin: ['', Validators.required],
        location: ['', Validators.required],
        date: ['', Validators.required],
        teacher: ['', [Validators.required]],
      }
    );
  }

  settingForm() {
    this.courseService.getCourseById(this.courseId)
      .subscribe(res => {
        console.log(res);
        
        // const teacher ={
        //   id: res['data']['teacher']['id'],
        //   name: res['data']['teacher']['fname']
        // }
        const location = {
          id: res['data'][0]['locationId'],
          name: res['data'][0]['locationName']
        }
        this.formEdit.controls['courseName'].setValue(res['data'][0]['name']);
        this.formEdit.controls['detail'].setValue(res['data'][0]['detail']);
        this.formEdit.controls['location'].patchValue(location)
        // this.formEdit.controls['teacher'].patchValue(teacher)
        this.formEdit.controls['conditionMin'].setValue({id:''+(res['data'][0]['conditionMin'])});
        
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
  filterTeacherMultiple(event) {
    let query = event.query;
    this.filteredTeacher = this.filterTeacher(query, this.teachers);
  } 
  filterTeacher(query, teachers: any):any[] {
    let filtered : any[] = [];
    for(let i = 0; i < teachers.length; i++) {
        let teacher = teachers[i]
        if((teacher.fname+teacher.lname).toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(teacher);
        }
    }
    return filtered;
    }
}
