import { Component, OnInit, OnDestroy } from '@angular/core';

import { CourseService } from '../shared/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { Course } from 'src/app/shared/interfaces/course';
import { SpecialApprove } from '../../../shared/interfaces/special-approve';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { TransportationsService } from 'src/app/shared/service/transportations.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  public course: Course;
  public memberIdList = [];
  public memberList = [];
  public msgs: any[] = [];
  public menu: MenuItem[];
  public transportations: any[];
  public displayDialog: boolean;
  public displayDialogmhc: boolean;
  public detailCourse: any;
  public specialApprove: SpecialApprove;
  public role: string;
  public courseId: string;
  public show = true;
  public totalRecordPass = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
    private authService: AuthService,
    private manageUserService: ManageUserService,
    private transportationsService: TransportationsService

  ) {
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(this.courseId);
    this.initCourse();
    this.initSpecialApprove();
    this.initdetailCourse();
    this.getData();
    this.authService.getRole().subscribe(res => this.role = res);
    this.getMemberByCourseId();
    this.getTotalCourseGraduated();

    if (this.role === 'user') {
      this.breadCrumbService.setPath([
        { label: 'ตารางเรียน', routerLink: '/schedule' },
        { label: 'รายละเอียดคอร์ส' },
      ]);
    }
    if (this.role === 'admin') {
    this.breadCrumbService.setPath([
      { label: 'จัดการคอร์สทั้งหมด', routerLink: '/manageCourse' },
      { label: 'รายละเอียดคอร์ส' },
    ]);
  }
  if (this.role === 'monk') {
    this.breadCrumbService.setPath([
      { label: 'จัดการคอร์ส', routerLink: '/manageCourseForMonk' },
      { label: 'รายละเอียดคอร์ส' },
    ]);
  }

    this.transportationsService.getTransportations().subscribe(
      res => {
        this.transportations = [
          ...res
        ];
      },
      err => {
        console.log(err['error']['message']);
      }
    );
  }

  ngOnDestroy(): void {
    // this.courseService.setCourse(null);
  }
  showButtonBack(...role) {
    return role.includes(this.role);
  }

  public assignCourse(id) {
    this.detailCourse.tranId = id;
    this.confirmationService.confirm({
      message: 'ยืนยันการลงทะเบียน',
      header: 'ข้อความจากระบบ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.assignCourse(this.detailCourse).subscribe((res) => {
          console.log(res);
          if (res['result'] === 'Success') {
            this.course.status = 'กำลังศึกษา';
            this.course.canRegister = 0;
            this.course.mhcStatus = '2';
            this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลงทะเบียนสำเร็จ' }];
            this.initdetailCourse();
          } else if (res['result'] === 'Fail') {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ปฏิเสธการลงเทียน'}];

      }
    });
  }
  // ขออนุมัติพิเศษ
  public approvalCourse(id) {
    this.specialApprove.tranId = id;
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
            this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ขออนุมัติพิเศษสำเร็จ' }];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
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
            this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ยกเลิกการขออนุมัติพิเศษสำเร็จ' }];
          } else if (res['result'] === 'Fail') {
            this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
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

  public mhcCourse(courseId: number) {
    this.displayDialogmhc = true;
    this.detailCourse.courseId = courseId;
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
      tranId: null,
      senseExpected: null,
      senseExperience: null,
    };
  }

  private initdetailCourse() {
    this.displayDialogmhc = false;
    this.detailCourse = {
      courseId: null,
      tranId: null,
      senseExpected: null,
      senseExperience: null,
    };
  }
  private getData() {
    this.route.params.pipe(switchMap(param =>
      this.courseService.getCourseByid(param.id)
    )).subscribe(res => {
      console.log(res);
      if (res.status === 'Success') {
        this.course = res['data'];
      }
    });
  }

  private getMemberByCourseId() {
    this.courseService.getUserByCourseId(this.courseId)
      .subscribe(res => {
        console.log(res);
        // tslint:disable-next-line:forin
        for (const key in res.data) {
          console.log(key, '=>', res.data[key]);
          this.memberIdList.push(res.data[key].memberId);
          this.manageUserService.getMemberById(res.data[key].memberId).subscribe(res => {
            console.log(res);
            this.memberList.push(res);
          });
        }
        console.log(this.memberIdList);
        console.log(this.memberList);
      });

  }

  private getTotalCourseGraduated() {
    this.courseService.getTotalCourseGraduated('1').subscribe(res => {
      console.log(res['data'][0]['getTotalCourseGraduated']);
      console.log(res);
      if (res['status'] === 'Success') {
        this.totalRecordPass = res['data'][0]['totalRecord'];
        console.log('999' + this.totalRecordPass);
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
  }

  public cancelDialog(cancel, model: NgModel) {
    if (cancel === '1') {
      this.displayDialogmhc = false;
      this.initdetailCourse();
    } else if (cancel === '2') {
      this.displayDialog = false;
      this.initSpecialApprove();
    }
    model.control.markAsUntouched();
    model.control.markAsPristine();
  }
}

