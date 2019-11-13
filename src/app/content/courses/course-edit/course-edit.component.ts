import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../shared/course.service';
import { formatDate, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../location/location.service';
import { ConfirmationService } from 'primeng/api';
import { ManageCourseComponent } from '../../manage-course/manage-course.component';
import { switchMapTo, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public msgs: any[] = [];
  public courseId: string;
  public formEdit: FormGroup;
  public noticearr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public notice: Array<any> = [];
  public location: Location[];
  public filteredTeacher: any[];
  public teachers: any[];
  public teacher: any;
  public teacherLength;
  public obj = [];
  @Input() id: number;
  @Output() displayEditDialog: EventEmitter<Boolean> = new EventEmitter();

  public pipe = new DatePipe('th-TH');
  public yearRange: string;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private manageCourse: ManageCourseComponent
  ) { }

  ngOnInit() {
    this.initNotice();

    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(this.courseId);

    this.breadCrumbService.setPath([
      { label: 'ตารางคอร์ส', routerLink: '/manageCourse' },
    ]);
    this.courseService.getTeachers().subscribe(
      res => {
        if (res.status === 'Success') {
          this.teachers = res['data'].map(res => {
            return {
              id: res.id,
              name: res.titleDisplay + res.fname + ' ' + res.lname
            };
          });
          console.log(this.teachers);

        }
      },
      error => {
        console.log(error['error']['message']);

      }
    );
    this.locationService.getLocation().subscribe(
      res => {
        if (res.status === 'Success') {
          this.location = res.data;
        }
      },
      error => {
        console.log(error['error']['message']);

      }
    );
    const currentYear = this.pipe.transform(Date.now(), 'yyyy');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
    this.createForm();

  }

  private initNotice() {
    this.noticearr.map(res => {
      this.notice.push({ id: res });
    });

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

  settingForm(id) {
    this.id = id;
    this.courseService.getCourseByid(id)
      .subscribe(res => {
        const result = [];
        let teacherLength;
        console.log(res);

        const teachers = res['data']['teacherList'].map(res => {
          return {
            id: res['id'],
            name: res['titleDisplay'] + res['fname'] + ' ' + res['lname'],

          };
        });
        console.log('Teachers = ' + teachers);
        for (let i = 0; i < teachers.length; i++) {

          this.obj.push(teachers[i]);

          // teacherLength= teachers.length
          console.log(this.obj);

          console.log(teachers);

        }
        console.log(this.obj.length);

        console.log('stDate = ' + res['data']['stDate']);
        console.log('endDate = ' + res['data']['endDate']);
        const dateJson = [];
        dateJson[0] = res['data']['stDate'];
        dateJson[1] = res['data']['endDate'];
        console.log(dateJson[0]);
        console.log(dateJson[1]);
        const datecon = new Date(JSON.stringify(dateJson[0]));
        const datecon2 = new Date(JSON.stringify(dateJson[1]));

        const date = [];
        date[0] = datecon;
        date[1] = datecon2;
        console.log(date);

        const location = {
          id: res['data']['locationId'],
          name: res['data']['locationName']
        };
        this.formEdit.controls['courseName'].setValue(res['data']['name']);
        this.formEdit.controls['detail'].setValue(res['data']['detail']);
        this.formEdit.controls['location'].patchValue(location);
        this.formEdit.controls['teacher'].patchValue(teachers);
        this.formEdit.controls['date'].patchValue(date);
        this.formEdit.controls['conditionMin'].setValue({ id: '' + (res['data']['conditionMin']) });

      },
        err => console.log(err['error']['message'])
      );
  }


  onSubmit(e) {
    e.preventDefault();
    const date2 = this.formEdit.get('date').value;
    console.log('dateForm0 =' + date2[0]);
    console.log('dateForm1 =' + date2[1]);
    const stDate = formatDate(date2[0], 'yyyy-MM-dd', 'en');
    const endDate = formatDate(date2[1], 'yyyy-MM-dd', 'en');
    const id = this.id;
    const date = this.formEdit.get('date').value;
    const datesort = date.map(res => formatDate(res, 'yyyy-MM-dd', 'en')).sort();
    console.log(this.obj);

    const course = {
      name: this.formEdit.get('courseName').value,
      detail: this.formEdit.get('detail').value,
      locationId: this.formEdit.get('location').value.id,
      conditionMin: parseInt(this.formEdit.get('conditionMin').value.id),
      date: datesort,
      stDate: stDate,
      endDate: endDate,
      teacher: this.formEdit.get('teacher').value.map(res => res.id)
    };

    this.courseService.editCourse(id, course).pipe(catchError(err => of({ result: 'Fail' })), switchMap(res => {
      if (res['result'] === 'Success') {
        this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'สร้างคอร์สสำเร็จ' }];
        this.displayEditDialog.emit(false);
        // this.showMessageCreate.emit(this.msgs);
        this.manageCourse.onShowMessage(this.msgs);
        return this.courseService.getCourseByid(id);

      } else if (res['result'] === 'Fail') {
        this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
        return of({ data: null })
      }
    })).subscribe(res => {
      const data = res['data'];
      if (data) {
        const index = this.manageCourse.courses.findIndex(c => c.id === id);
        if (index !== -1) {
          this.manageCourse.courses.splice(index, 1, data);
        }
      }
    });
    this.router.navigateByUrl('/manageCourse');
  }
  onCancel() {
    this.formEdit.reset();
    this.displayEditDialog.emit(false);
  }

  filterTeacherMultiple(event) {
    const query = event.query;
    this.filteredTeacher = this.filterTeacher(query, this.teachers);
  }
  filterTeacher(query, teachers: any): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < teachers.length; i++) {
      const teacher = teachers[i];
      if ((teacher.name).toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(teacher);
      }
    }
    return filtered;
  }
}
