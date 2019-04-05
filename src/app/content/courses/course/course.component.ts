import {Component, OnInit, OnDestroy} from '@angular/core';

import {CourseService} from '../shared/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem, ConfirmationService} from 'primeng/api';
import {BreadcrumbService} from '../../../shared/service/breadcrumb.service';
import {Course} from 'src/app/shared/interfaces/course';
import {SpecialApprove} from '../../../shared/interfaces/special-approve';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  public course: Course;
  public msgs: any[] = [];
  public menu: MenuItem[];
  public displayDialog: boolean;
  public specialApprove: SpecialApprove;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initCourse();
    this.initSpecialApprove();
    this.getData();

    this.breadCrumbService.setPath([
      {label: 'Courses : ข้อมูลคอร์สทั้งหมด', routerLink: '/courses'},
      {label: 'Course Detail : รายละเอียดคอร์ส'},
    ]);
  }

  ngOnDestroy(): void {
    // this.courseService.setCourse(null);
  }

  public assignCourse(id) {
    this.confirmationService.confirm({
      message: 'ยืนยันการลงทะเบียน',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.assignCourse(id).subscribe((res) => {
          console.log(res);
          if (res['result'] === 'Success') {
            this.course.status = 'กำลังศึกษา';
            this.course.canRegister = 0;
            this.course.mhcStatus = '2';
            this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลงทะเบียนสำเร็จ'}];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage']}];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการลงเทียน'}];

      }
    });
  }

  public approvalCourse() {
    this.confirmationService.confirm({
      message: 'ยืนยันการยกเลิกการขออนุมัติพิเศษ',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.specialApprove);
        this.courseService.approvalCourse(this.specialApprove).subscribe((res) => {
          console.log(res);

          if (res['result'] === 'Success') {
            this.course.status = 'รอการอนุมัติ';
            this.course.saStatus = '2';
            this.course.canRegister = 0;
            this.initSpecialApprove();
            this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ขออนุมัติพิเศษสำเร็จ'}];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage']}];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
  }

  public cancelApprovalCourse(id) {
    this.confirmationService.confirm({
      message: 'ยืนยันการยกเลิกการขออนุมัติพิเศษ',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.cancelApprovalCourse(id).subscribe((res) => {
          console.log(res);
          if (res['result'] === 'Success') {
            this.course.status = 'ยังไม่ได้ลงทะเบียน';
            this.course.canRegister = 1;
            this.course.saStatus = null;
            this.msgs = [{severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ยกเลิกการขออนุมัติพิเศษสำเร็จ'}];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage']}];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการยกเลิกการขออนุมัติพิเศษ'}];
      }
    });
  }

  public saCourse(courseId: number) {
    this.displayDialog = true;
    this.specialApprove.courseId = courseId;
  }

  private initSpecialApprove() {
    this.displayDialog = false;
    this.specialApprove = {
      specialApproveId: null,
      courseId: null,
      memberId: null,
      detail: '',
      status: '',
      createDate: null,
      lastUpdate: null,
      courseName: null,
    };
    //this.specialApprove={};
  }

  private getData() {
    this.route.params.pipe(switchMap(param =>
      this.courseService.getCourseฺByid(param.id)
    )).subscribe(res => {
      console.log(res);
      if (res.status === 'Success') {
        this.course = res['data'];
      }
    });
  }

  private initCourse() {
    this.course = {
      id: null,
      name: '',
      stDate: null,
      endDate: null,
      detail: '',
      conditionMin: null,
      memberId: '',
      memberFname: '',
      memberLname: '',
      locationId: null,
      locationName: '',
      status: '',
      saStatus: '',
      mhcStatus: '',
      canRegister: null
    };
    //this.course={};
  }
}
