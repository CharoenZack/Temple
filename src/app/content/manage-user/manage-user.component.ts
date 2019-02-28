import { Component, OnInit } from '@angular/core';
import { ManageUserService } from 'src/app/shared/service/manage-user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  public personal:any[];

  constructor(
    private manageUser:ManageUserService
  ) { }

  ngOnInit() {
    this.manageUser.getAllUsers().subscribe(res=> {
      this.personal = res
    });
  }



}
