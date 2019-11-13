import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { Course } from 'src/app/shared/interfaces/course';
import { CourseService } from '../courses/shared/course.service';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CourseCreateComponent } from '../courses/course-create/course-create.component';
import { CourseEditComponent } from '../courses/course-edit/course-edit.component';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {

  @ViewChild('closeDialog') closeDialog: CourseCreateComponent;
  @ViewChild('courseEdit') courseEdit: CourseEditComponent;
  msgs: any[] = [];
  courses: Course[];
  cols: any[];
  public menu: MenuItem[];
  public totalRecords: number;
  public loading: boolean;
  public showDialog: Boolean;
  public showEditDialog: boolean;

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
      { field: 'createDate', header: 'วันที่สร้าง' },
      { field: 'lastUpdate', header: 'วันที่แก้ไขล่าสุด' },
      { field: 'name', header: 'ชื่อคอร์ส' },
      { field: 'locationName', header: 'สถานที่' },
      { field: 'conditionMin', header: 'หมายเหตุ' },
    ];

    this.breadCrumbService.setPath([
      { label: 'จัดการคอร์สทั้งหมด', routerLink: '/manageCourse' },
    ]);
    this.loading = true;
  }

  createCourse() {
    // this.router.navigateByUrl('/createCourse');
    this.showDialog = true;
  }

  editCourse(id) {
    this.showEditDialog = true;
    this.courseEdit.settingForm(id);
  }

  deleteCourse(id) {
    this.confirmationService.confirm({
      message: 'ต้องการลบข้อมูลหรือไม่?',
      header: 'จัดการคอร์ส',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this);

        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        // this.courseService.deleteCourse(id).subscribe(function (res) {
        //   if (res['status'] === 'Success') {
        //     this.courses = res['data'];
        //   }
        // });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
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

  private getData(first = 0, rows = 10, query: string = '', mhcStatus: string = '') {
    this.loading = true;
    of([first, rows, query, mhcStatus]).pipe(
      switchMap(([firstCon, rowsCon, queryCon, mhcStatusCon]: [number, number, string, string]) =>
        this.courseService.getCourseWithOutUser(firstCon, rowsCon, queryCon, mhcStatusCon))
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

  onCancel(displayCreateCourse, displayEditDialog) {
    this.showDialog = displayCreateCourse;
    this.showEditDialog = displayEditDialog;
  }

  onShowMessage(e) {
    this.msgs = e;
  }

  Close() {
    // this.closeDialog.formEdit.reset();
    Object.values(this.closeDialog.formEdit.controls).forEach(control => {
      control.markAsUntouched();
      control.markAsPristine();
    });
  }
}
