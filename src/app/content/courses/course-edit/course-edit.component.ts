import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../shared/course.service';
import { formatDate, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../location/location.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public msgs: any[] = [];
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
      private router: Router,
      private confirmationService: ConfirmationService,
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
    this.courseService.getCourseByid(this.courseId)
      .subscribe(res => {
        console.log(res);
        
        // const teacher ={
        //   id: res['data']['teacher']['id'],
        //   name: res['data']['teacher']['fname']
        // }
        const location = {
          id: res['data']['locationId'],
          name: res['data']['locationName']
        }
        this.formEdit.controls['courseName'].setValue(res['data']['name']);
        this.formEdit.controls['detail'].setValue(res['data']['detail']);
        this.formEdit.controls['location'].patchValue(location)
        // this.formEdit.controls['teacher'].patchValue(teacher)
        this.formEdit.controls['conditionMin'].setValue({id:''+(res['data']['conditionMin'])});
        
        },
        err => console.log(err['error']['message'])
      );
  }

  onSubmit(e) {
    e.preventDefault();
    const id = 1
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
      this.courseService.editCourse(id,course).subscribe(res => {
        if (res['result'] === 'Success') {
          this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'สร้างคอร์สสำเร็จ' }];
        } else if (res['result'] === 'Fail') {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
        }
      });
      this.router.navigateByUrl('/manageCourse');
  }
  onCancel() {
    this.confirmationService.confirm({
      message: 'ยืนยันการยกเลิกการแก้ไขคอร์ส',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ยืนยันการยกเลิกการแก้ไขคอร์ส'}];
        this.router.navigateByUrl('/manageCourse');
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
    
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
