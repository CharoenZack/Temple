import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  msgs: any[] = [];
  courses: Course[];
  cols: any[];
  constructor(
    private course:CourseService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {

    this.courses = this.course.getCourses();
    this.cols = [
      {field: 'date',header: 'วันที่'},
      {field: 'name',header: 'ชื่อคอร์ส'},
      {field: 'location',header:'สถานที่'},
      {field: 'annotation',header:'หมายเหตุ'},
    ]
  }
  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}
}
