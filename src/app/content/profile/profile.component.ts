import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';
import {ManageUserService} from 'src/app/shared/service/manage-user.service';
import {Member} from 'src/app/shared/interfaces/member';
import {Router, ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public menu: MenuItem;
  public userData: Member;
  public userId: string;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private manageUser: ManageUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.breadCrumbService.setPath([
      {label: 'Profile: ข้อมูลส่วนตัว'},
    ]);
    this.getData();
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

  goToEdit() {
    const path = `/profile/${this.userId}/edit`;
    this.router.navigate([path]);
  }

}
