import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/interfaces/course';
import { formatDate, DatePipe } from '@angular/common';
import { LocationService } from '../../location/location.service';
import { CourseService } from '../shared/course.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
// import { Teacher } from 'src/app/shared/interfaces/teacher';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  public msgs: any[] = [];
  public formEdit: FormGroup;
  public courses: Course[];
  public locations: Location[];
  public noticearr = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  public notice: Array<any> = [];
  public filteredTeacher: any[];
  public teachers: any[];
  public teacher: any;
  public pipe = new DatePipe('th-TH')
  public yearRange: string;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private courseService: CourseService,
    private router: Router,
    private confirmationService: ConfirmationService,
    // private memberService: MemberService,
  ) { }

  ngOnInit() {
    this.initNotice();

    this.breadCrumbService.setPath([
      { label: 'Courses management : จัดการคอร์สทั้งหมด', routerLink: '/manageCourse' },
      { label: 'Create course : สร้างคอร์ส', routerLink: '/createCourse' },
    ]);
    this.courseService.getTeachers().subscribe(
      res => {
        if (res.status == 'Success') {
          this.teachers = res.data;
        }
      },
      error => {
        console.log(error['error']['message']);

      }
    )
    this.locationService.getLocation().subscribe(
      res => {
        if (res.status == 'Success') {
          this.locations = res.data;
        }
      },
      error => {
        console.log(error['error']['message']);

      }
    )
    const currentYear = this.pipe.transform(Date.now(), 'yyyy');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
    this.createForm();
  }

  private initNotice() {
    this.noticearr.map(res => {
      this.notice.push({ id: res })
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
        teachers: ['', Validators.required],
      }
    );
  }
  onSubmit(e) {
    e.preventDefault();
    this.confirmationService.confirm({
      message: 'ยืนยันการสร้างคอร์ส',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const date = this.formEdit.get('date').value;
        console.log(date);
        
        const datesort = date.map(res => formatDate(res, "yyyy-MM-dd", 'en')).sort();
        console.log(this.formEdit.get('teachers').value);

        const course = {
          name: this.formEdit.get('courseName').value,
          detail: this.formEdit.get('detail').value,
          locationId: this.formEdit.get('location').value.id,
          conditionMin: this.formEdit.get('conditionMin').value.id,
          date: datesort,
          teacher: this.formEdit.get('teachers').value.map(res => res.id)
        };
        console.log(course);

        this.courseService.createCourse(course).subscribe(res => {
          if (res['result'] === 'Success') {
            this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'สร้างคอร์สสำเร็จ' }];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
          }
        });
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
  filterTeacher(query, teachers: any): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < teachers.length; i++) {
      let teacher = teachers[i]
      if ((teacher.fname + teacher.lname).toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(teacher);
      }
    }
    return filtered;
  }

  onCancel() {
    this.confirmationService.confirm({
      message: 'ยืนยันการยกเลิกการสร้างคอร์ส',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ยืนยันการยกเลิกการสร้างคอร์ส'}];
        this.router.navigateByUrl('/manageCourse');
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
    
  }
}

