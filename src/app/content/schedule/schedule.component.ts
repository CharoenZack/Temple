import {Component, OnInit} from '@angular/core';
import {ScheduleService} from 'src/app/shared/service/schedule.service';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  events: any[];
  options: any;

  constructor(
    private scheduleService: ScheduleService,
    private breadCrumbService: BreadcrumbService,
  ) {

  }

  ngOnInit() {
    this.setPath();
    this.loadData();
    this.setOption();
  }

  private setPath() {
    this.breadCrumbService.setPath([
      {label: 'Schedule : ตารางเรียน'}
    ]);
  }

  private loadData() {
    this.scheduleService.getSchedule()
      .subscribe(res => {
          console.log(res);
          if (res['status'] === 'Success') {
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
