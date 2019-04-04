import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/interfaces/course';
import { formatDate } from '@angular/common';
import { LocationService } from '../../location/location.service';
import { CourseService } from '../shared/course.service';
// import { Teacher } from 'src/app/shared/interfaces/teacher';
import { Member } from 'src/app/shared/interfaces/member';
// import { Teacher } from 'src/app/shared/interfaces/teacher';

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
    // private memberService: MemberService,
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
        // teacher:['', Validators.required],
      }
    );
  }
  onSubmit(e) {
    e.preventDefault();
    const date = this.formEdit.get('date').value;
    const datesort = date.map( res => formatDate(res,"yyyy-MM-dd",'en')).sort();
    // const stdate = datesort[0];
    // const enddate = datesort[date.length-1];
    console.log(this.teacher);
    
    const course = {
        name: this.formEdit.get('courseName').value,
        detail: this.formEdit.get('detail').value,
        locationId: this.formEdit.get('location').value.id,
        // stdate: stdate,
        // enddate: enddate,
        conditionMin: this.formEdit.get('conditionMin').value.id,
        date:datesort,
        teacher:this.teacher
      };
      console.log(course);
      
      this.courseService.createCourse(course).subscribe(
        res => {
          console.log(res);

        },
        err => {
          console.log(err['error']['message']);
        }
      );
    const courseS = {
        date: datesort
    }




      
  }
  filterTeacherMultiple(event) {
    let query = event.query;
    console.log(query);
    
    this.courseService.getTeachers().subscribe(teachers => {
        this.filteredTeacher = this.filterTeacher(query, teachers);
        
        
    });
  } 
  filterTeacher(query, teachers: any):any[] {
    console.log(query,teachers);
    
    let filtered : any[] = [];
    for(let i = 0; i < teachers.data.length; i++) {
        let teacher = teachers.data[i].fname+' '+teachers.data[i].lname;
        if(teacher.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(teacher);
        }
    }
    console.log(filtered);
    return filtered;
    
    
}
}
