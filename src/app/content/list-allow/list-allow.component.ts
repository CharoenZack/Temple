import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';
import {ActivatedRoute} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseService } from '../courses/shared/course.service';

@Component({
  selector: 'app-list-allow',
  templateUrl: './list-allow.component.html',
  styleUrls: ['./list-allow.component.css']
})
export class ListAllowComponent implements OnInit {

  @Input('member') member;
  @Input('option') option;
  @Input('cols') cols;
  @Input('fieldId') fieldId;
  @Input('msgs') msgs;
  @Output() listData = new EventEmitter();
  public status;
  public check: boolean;
  public checked = true;
  public courseId: string;
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

  public urlback: string;
  public messageback: string;
  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private courseService: CourseService,
    private messageService: MessageService
  ) {
  }
  ngOnInit() {
    this.urlback = this.route.snapshot.data.urlback;
    this.messageback = "กลับไปยังหน้า"+this.route.snapshot.data.messageback;
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.status = {
      status: '1',
      menuName: 'อนุมัติ',
    };
    this.check = false;

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
  onCheck() {
    const obj = this.member.filter((item) => {
      return item.checked === true;
    });

    if (obj.length !== this.member.length) {
      this.check = false;
    } else {
      this.check = true;
    }
  }
  dropdown() {
    if (this.option === '1') {
      return false;
    } else if (this.option === '2') {
      return true;
    }
  }
  sentData() {
    this.check = false;
    let memberSent;
    if (this.option === '1') {
      memberSent = this.member.map(member => {
        return {
          mhcId: member[this.fieldId],
          status: member['checked'] ? '1' : '2'
        };
      });
      memberSent = {
        member: [...memberSent],
        courseId: this.courseId
      };
    } else if (this.option === '2') {
      memberSent = this.member.filter((member) => member.checked === true).map(member => member[this.fieldId]);
      memberSent = {
          member: [
            ...memberSent
          ],
          courseId: this.courseId,
          status: this.status.status
        };
    }
    if (this.member.length !== 0) {
      this.listData.emit(memberSent);
    }
  }
  showCheckbox() {
    return !(this.member[0]['displayName'] === 'ไม่มีข้อมูล');
  }
  showToast(key, detail) {
    this.messageService.clear();
    this.messageService.add(
      {
        key: key,
        sticky: true,
        summary: 'ข้อความจากระบบ',
        detail: detail
      }
    );
  }

}
