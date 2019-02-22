import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from '../../shared/service/personal-info.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  public personal:any[]

  constructor(
    private personalInfo : PersonalInfoService
  ) { }

  ngOnInit() {
    this.personal = this.personalInfo.getAllPersonalInfo();
  }



}
