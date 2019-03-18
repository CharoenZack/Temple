import {Component, OnInit} from '@angular/core';
import {ManageUserService} from 'src/app/shared/service/manage-user.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  public personal: any[];
  public menu: MenuItem[];

  constructor(
    private manageUser: ManageUserService
  ) { }

  ngOnInit() {
    this.manageUser.getAllUsers().subscribe(res => {
      if (res['status'] === 'Success') {
        this.personal = res.data;
      }
    },
      (e) => console.log(e['error']['message'])
    );
    this.menu = [
      { label: '',icon:"pi pi-home",url:'/'},
      { label: 'Manange Locations : จัดการสถานที่' },
    ];
  }

  deleteUser(id) {
    console.log(id);
    this.manageUser.deleteUser(id)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          const index = this.personal.findIndex(e => e.id === id);
          console.log(index);

          this.personal = [
            ...this.personal.slice(0, index),
            ...this.personal.slice(index + 1)
          ]
        }
      },
        (e) => console.log(e['error']['message'])
      );
  }


}
