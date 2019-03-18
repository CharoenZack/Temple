import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';
import { Member } from 'src/app/shared/interfaces/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public menu: MenuItem;
  public userData:Member;
  public userId:string;
  constructor(
    private breadCrumbService: BreadcrumbService,
    private manageUser:ManageUserService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.breadCrumbService.setPath([
      { label: 'Profile: ข้อมูลส่วนตัว' },
    ]);

    this.manageUser.getUser(this.userId)
    .subscribe(res=>{
      if(res['status']==='Success'){
        this.userData = res['data'];
      }
    },
    (err)=>{
      console.log(err['error']['message']);
    })

  }

  goToEdit(){
    const path = `/profile/${this.userId}/edit`;
    this.router.navigate([path]);
  }

}
