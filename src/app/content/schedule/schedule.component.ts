import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/service/schedule.service';
import { BreadcrumbService } from '../../shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  events: any[];
  options: any;
  title: String;
  day: any;
  newEndDate: any;
  element: any;

  constructor(
    private scheduleService: ScheduleService,
    private breadCrumbService: BreadcrumbService,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {

    if (this.authService.getRole().value === 'monk') {
      this.title = 'ตารางสอน';
      this.loadDataForMonk();
    } else if (this.authService.getRole().value === 'user') {
      this.title = 'ตารางเรียน';
      this.loadData();
    }
    this.setPath();
    this.setOption();
  }

  private setPath() {
    this.breadCrumbService.setPath([
      { label: `${this.title}` }
    ]);
  }

  private loadData() {
    this.scheduleService.getSchedule()
      .subscribe(res => {
        console.log(res);
        if (res['status'] === 'Success') {
          res['data'].forEach(element => {
            this.day = new Date(element.end);
            this.day.setDate((this.day.getDate()) + 1);
            this.newEndDate = new DatePipe('en-En').transform(this.day, 'yyyy-MM-dd');
            element.end = this.newEndDate;
          });
          this.events = res['data'];
        }
      },
        err => {
          console.log('Error', err);
        });
  }

  private loadDataForMonk() {
    this.scheduleService.getScheduleForMonk()
      .subscribe(res => {
        console.log(res);
        if (res['status'] === 'Success') {
          res['data'].forEach(element => {
            this.day = new Date(element.end);
            this.day.setDate((this.day.getDate()) + 1);
            this.newEndDate = new DatePipe('en-En').transform(this.day, 'yyyy-MM-dd');
            element.end = this.newEndDate;
          });
          this.events = res['data'];
        }
      },
        err => {
          console.log('Error', err);
        });
  }

  private setOption() {
    this.options = {
      header: {
        left: 'prev,today,next',
        center: 'title',
        right: 'month,agendaWeek'
      },
      locale: 'th',
      buttonText: {
        prev: 'ย้อน',
        next: 'ถัดไป',
        today: 'วันนี้',
        month: 'เดือน',
        week: 'สัปดาห์',
        day: 'วัน',
        list: 'แผนงาน'
      },
      allDayText: 'ตลอดวัน',
      eventLimitText: 'เพิ่มเติม',
      noEventsMessage: 'ไม่มีกิจกรรมที่จะแสดง'
    };
  }
}
