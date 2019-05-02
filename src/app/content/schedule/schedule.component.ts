import {Component, OnInit} from '@angular/core';
import {ScheduleService} from 'src/app/shared/service/schedule.service';
import {BreadcrumbService} from '../../shared/service/breadcrumb.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  events: any[];
  options: any;
  title:String;

  constructor(
    private scheduleService: ScheduleService,
    private breadCrumbService: BreadcrumbService,
    private authService:AuthService,
  ) {

  }

  ngOnInit() {
    
    if(this.authService.getRole().value === "monk"){
      this.title = "ตารางสอน"
      this.loadDataForMonk();
    }else if(this.authService.getRole().value === "user") {
      this.title = "ตารางเรียน"
      this.loadData();
    }
    this.setPath();
    this.setOption();
  }

  private setPath() {
    this.breadCrumbService.setPath([
      {label: `Schedule : ${this.title}` }
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

  private loadDataForMonk(){
    this.scheduleService.getScheduleForMonk()
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
