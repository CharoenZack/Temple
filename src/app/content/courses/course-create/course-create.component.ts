import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/interfaces/course';
import { formatDate } from '@angular/common';
import { LocationService } from '../../location/location.service';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  public formEdit: FormGroup;
  public courses:Course[];
  public locations:Location[];
  public noticearr = [1,2,3,4,5,6,7,8,9,10]
  public notice: Array<any> = [];
  public filteredTeacher: any[];
  public teachers:any[];
  public teacher:any;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    this.initNotice();
    this.breadCrumbService.setPath([
      { label: 'CreateCourse : สร้างคอร์ส', routerLink: '/createCourse' },
    ]);

    this.locationService.getLocation().subscribe( 
      res => {
        if(res.status == 'Success'){
          this.locations = res.data;
        }    
      },
      error =>{
        console.log(error['error']['message']);
        
      }
    ) 
    this.createForm();   
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
        location: ['', Validators.required],
        date: ['', Validators.required],
        conditionMin: ['', Validators.required],
        teacher:['', Validators.required],
      }
    );
  }
  onSubmit(e) {
    const date = this.formEdit.get('date').value;
    const datesort = date.map( res => formatDate(res,"yyyy-MM-dd",'en')).sort();
    const stdate = datesort[0];
    const enddate = datesort[date.length-1];
    const course = {
        courseName: this.formEdit.get('courseName').value,
        detail: this.formEdit.get('detail').value,
        location: this.formEdit.get('location').value,
        stdate: stdate,
        enddate:enddate,
        condition: this.formEdit.get('conditionMin').value,
        
      };

  }
  filterTeacherMultiple(event) {
    let query = event.query;
    this.courseService.getTeachers().subscribe(teachers => {
        this.filteredTeacher = this.filterTeacher(query, teachers);
    });
  } 
  filterTeacher(query, teachers: any):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < teachers.length; i++) {
        let teacher = teachers[i];
        if(teacher.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(teacher);
        }
    }
    return filtered;
}
}
