import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MenuItem} from 'primeng/api';
import {Course} from 'src/app/shared/interfaces/course';
import {CourseService} from '../courses/shared/course.service';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';
import {Router, ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {

  msgs: any[] = [];
  courses: Course[];
  cols: any[];
  public menu: MenuItem[];
  public totalRecords: number;
  public loading: boolean;

  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getTotalRecord();
    
    this.cols = [
      {field: 'stDate', header: 'วันที่'},
      {field: 'name', header: 'ชื่อคอร์ส'},
      {field: 'locationName', header: 'สถานที่'},
      {field: 'conditionMin', header: 'หมายเหตุ'},
    ];

    this.breadCrumbService.setPath([
      {label: 'Courses management : จัดการคอร์สทั้งหมด', routerLink: '/manageCourse'},
    ]);
    this.loading = true;
  }

  createCourse() {
    this.router.navigateByUrl('/createCourse');
  }

  editCourse(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this);

        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        // this.courseService.editCourse(id).subscribe(function (res) {
        //   if (res['status'] === 'Success') {
        //     this.courses = res['data'];
        //   }
        // });
        this.router.navigateByUrl(`/editCourse/${id}`);
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  deleteCourse(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this);

        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        // this.courseService.deleteCourse(id).subscribe(function (res) {
        //   if (res['status'] === 'Success') {
        //     this.courses = res['data'];
        //   }
        // });
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  private getTotalRecord() {
    this.courseService.getTotalRecord().subscribe(res => {
      if (res['status'] === 'Success') {
        this.totalRecords = res['data'][0]['totalRecord'];
      }
    });
  }

  private getData(first = 0, rows = 10, query: string = '') {
    this.loading = true;
    of([first, rows, query]).pipe(
      switchMap(([firstCon, rowsCon, queryCon]: [number, number, string]) =>
        this.courseService.getCourses(firstCon, rowsCon, queryCon))
    ).subscribe(res => {
      if (res['status'] === 'Success') {
        this.courses = res['data'];
        this.loading = false;
      }
    });
  }

  public loadData(e: LazyLoadEvent) {
    console.log(e);
    let query = '';
    if (e.globalFilter) {
      query = e.globalFilter;
    }
    this.getData(e.first, e.rows, query);
  }
}
