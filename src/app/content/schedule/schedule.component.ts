import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/service/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  events: any[];
  options: any;
  constructor(
    private scheduleService: ScheduleService
  ) {

  }

  ngOnInit() {
    // this.events = [
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-01"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-04"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-06"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-08"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-11"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-13"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-15"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-18"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-20"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-22"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-25"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-02-27"
    //   },
    //   {
    //     "title": "คอร์สธรรมะ 1",
    //     "start": "2019-03-01"
    //   },
    //];
    this.scheduleService.getSchedule()
      .subscribe(res => {
        console.log(res, 'schedule');

        if (res['Status'] === 'Success') {
          this.events = res['data']
          this.events = [
            ...this.events,
            {
              "title": "คอร์สธรรมะ 1",
              "start": "2019-03-01"
            }
          ]
    
      } else {

        }
      },
        err => {
          console.log('Error', err)
        })


    this.options = {
      header: {
        left: 'prev,today,next',
        center: 'title',
        right: 'month,agendaWeek'
      },
      locale: 'th',
      buttonText: {
        prev: "ย้อน",
        next: "ถัดไป",
        today: "วันนี้",
        month: "เดือน",
        week: "สัปดาห์",
        day: "วัน",
        list: "แผนงาน"
      },
      allDayText: "ตลอดวัน",
      eventLimitText: "เพิ่มเติม",
      noEventsMessage: "ไม่มีกิจกรรมที่จะแสดง"
    };
  }

}
