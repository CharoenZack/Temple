import { Course } from './../../shared/interfaces/course';
import { Component, OnInit } from '@angular/core';
import { MenuItem, LazyLoadEvent } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { Member } from 'src/app/shared/interfaces/member';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ManageRoleService } from 'src/app/shared/service/manage-role.service';
import { CourseService } from '../courses/shared/course.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public cols: any[];
  public menu: MenuItem;
  public userData: Member;
  public courseData: Course[];
  public userId: string;
  public ShowTable: boolean;
  public previewImg: any;
  public totalRecordPass: any;
  constructor(
    private breadCrumbService: BreadcrumbService,
    private manageUser: ManageUserService,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: ManageRoleService,
    private courseService: CourseService
  ) {
  }

  ngOnInit() {
    this.ShowTable = this.roleService.getRoleShowTable();
    this.userId = localStorage.getItem('userId');
    this.breadCrumbService.setPath([
      { label: 'ข้อมูลส่วนตัว' },
    ]);
    this.getData();
    this.setColumn();
    this.getPassCourse();
    this.getTotalRecordPass();
  }

  getData() {
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getUser(id).subscribe(
        res => {
          if (res['status'] === 'Success') {
            this.userData = res['data'];
            console.log(this.userData);
          }
        },
        (err) => {
          console.log(err['error']['message']);
        }
      );
    });
  }
  // เชื่อม Service คอร์สที่ผ่านแล้ว
  getPassCourse() {
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getPassCourse(id).subscribe(
        res => {
          this.courseData = res['data'];
          console.log(res);

        },
        (err) => {
          console.log(err['error']['message']);
        }
      );
    });
  }

  goToEdit() {
    const path = `/profile/${this.userId}/edit`;
    this.router.navigate([path]);
  }
  goToHomepage() {
    const path = `/#/`;
    this.router.navigate([path]);
  }

  private setColumn() {
    this.cols = [
      { field: 'stDate', header: 'วันที่ปฏิบัติ' },
      { field: 'name', header: 'ชื่อคอร์ส' },
    ];
  }

  public loadData(e: LazyLoadEvent) {
    console.log(e);
    let query = '';
    if (e.globalFilter) {
      query = e.globalFilter;
    }
    // this.getData(e.first, e.rows, query);
  }
  public onRowSelect(e) {
    const course: Course = e.data;
    this.router.navigate(['/profile/course', course.id]);
  }

  private getTotalRecordPass() {
    this.courseService.getTotalCourseGraduated('1').subscribe(res => {
      console.log(res['data'][0]['getTotalRecordPass']);
      console.log(res);
      if (res['status'] === 'Success') {
        this.totalRecordPass = res['data'][0]['totalRecord'];
        console.log(this.totalRecordPass);
      }
    });
  }
}
