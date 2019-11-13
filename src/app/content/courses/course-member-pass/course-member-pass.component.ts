import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../shared/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { Course } from 'src/app/shared/interfaces/course';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-course-member-pass',
  templateUrl: './course-member-pass.component.html',
  styleUrls: ['./course-member-pass.component.scss']
})
export class CourseMemberPassComponent implements OnInit {
  public course: Course;
  public msgs: any[] = [];
  public menu: MenuItem[];
  public role: string;
  public courseId: string;
  public userId: string;
  public urlback: string;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
    private authService: AuthService,

  ) {
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId');
    console.log(this.courseId);
    this.initCourse();
    this.getData();

    this.breadCrumbService.setPath([
      { label: 'ข้อมูลส่วนตัว', routerLink: ['/profile', localStorage.getItem('userId')] },
      { label: 'รายละเอียดคอร์ส' },
    ]);
  }

  private getData() {
    this.route.params.pipe(switchMap(param =>
      this.courseService.getCoursesPass(param.id)
    )).subscribe(res => {
      console.log(res);
      if (res.status === 'Success') {
        this.course = res['data'];
      }
    });
  }
  showButtonBack(...role) {
    return role.includes(this.role);
  }

  public onRowSelect(e) {
    const course: Course = e.data;
    this.router.navigate(['/profile', course.id]);
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
}
