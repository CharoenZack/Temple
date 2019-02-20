import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course:Course

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.course = this.courseService.getCourse(+params.id));

  }

}
