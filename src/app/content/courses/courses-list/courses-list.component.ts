import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: Course[];
  cols: any[];
  constructor(
    private course:CourseService
  ) { }

  ngOnInit() {

    this.courses = this.course.getCourses();
    console.log(this.courses)
    this.cols = [
      {field: 'date',header: 'วันที่'},
      {field: 'name',header: 'ชื่อคอร์ส'},
      {field: 'location',header:'สถานที่'},
      {field: 'annotation',header:'หมายเหตุ'},
    ]
  }
}
