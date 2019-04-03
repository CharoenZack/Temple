import {Component, OnInit, ViewChild, SimpleChanges} from '@angular/core';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';
import {isNgTemplate} from '@angular/compiler';

@Component({
  selector: 'app-manage-pass-course-form',
  templateUrl: './manage-pass-course-form.component.html',
  styleUrls: ['./manage-pass-course-form.component.css']
})
export class ManagePassCourseFormComponent implements OnInit {

  public typeSelect: boolean;
  public check: boolean;
  public selectedValues: string[] = [];
  public countSelect: number;
  public checked: boolean = true;
  public menuSelect: string;
  public menusSelect = [
    {
      menuId: '1',
      menuName: 'อนุมัติ',
    },
    {
      menuId: '2',
      menuName: 'ไม่อนุมัติ',
    },
  ];

  public member = [
    {
      name: 'test 1',
      checked: false
    },
    {
      name: 'test 2',
      checked: false
    },
    {
      name: 'test 3',
      checked: false
    },
    {
      name: 'test 4',
      checked: false
    },
    {
      name: 'test 5',
      checked: false
    },
    {
      name: 'test 6',
      checked: false
    },
  ];

  public cols: any[];


  constructor(
    private breadCrumbService: BreadcrumbService
  ) {
  }

  ngOnInit() {
    this.check = false;
    this.countSelect = 1;
    this.breadCrumbService.setPath([
      {label: 'Manage Pass Course: จัดการการอนุมัติผู้เรียน'},
      {label: 'Manage Pass Course: จัดการการอนุมัติผู้เรียน'},
    ]);

    this.cols = [
      {field: 'name', header: 'ชื่อ-นามสกุล'},
    ];
  }


  selectAll() {

    // check ว่า dechecked หรือ checked
    if (this.check) {
      this.member.map((data) => {
        data.checked = true;
      });
    } else {
      this.member.map((data) => {
        data.checked = false;
      });
    }

  }

  oncheck() {
    const obj = this.member.filter((item) => {
      return item.checked === true;
    });

    if (obj.length !== this.member.length) {
      this.check = false;
    } else {
      this.check = true;
    }
  }
}
