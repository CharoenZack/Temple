import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';

@Component({
  selector: 'app-list-allow',
  templateUrl: './list-allow.component.html',
  styleUrls: ['./list-allow.component.css']
})
export class ListAllowComponent implements OnInit {

  @Input('member') member;
  @Input('option') option;
  @Output() listData = new EventEmitter();
  public status;
  public check: boolean;
  public countSelect: number;
  public checked: boolean = true;
  public cols: any[];
  public menusSelect = [
    {
      status: '1',
      menuName: 'อนุมัติ',
    },
    {
      status: '0',
      menuName: 'ไม่อนุมัติ',
    },
  ];


  constructor(

  ) {
  }

  ngOnInit() {
    this.status = {
      status: '1',
      menuName: 'อนุมัติ',
    }
    this.check = false;

    this.cols = [
      { field: 'name', header: 'ชื่อ-นามสกุล' },
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

  dropdrow() {
    if (this.option === "1") {
      return false
    } else if (this.option === "2") {
      return true
    }
  }

  sentData() {

    var memberSent = this.member.filter((member) => member.checked === true).map(member => member.name)
    memberSent = 
      {
        member: [
          ...memberSent
        ],
      courseId: "11111",
      status: this.status.status
      }
    
      this.listData.emit(memberSent)
  }

}
