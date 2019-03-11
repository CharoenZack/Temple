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

  course: Course

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    this.course = {};
    let id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.course = res['data']
          console.log(this.course);
        }
      });
  }


}
