import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/interfaces/course';
import { CourseService } from './shared/course.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course: Course;
  test = 'test'

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {

  }

  ngOnInit() {
    this.course = {};
    //let id = this.route.snapshot.paramMap.get('id');
    var id = '1';
    //console.log(id,'id');
    this.courseService.getCourse(id)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.course = res['data']
          console.log(this.course);
        }
      },
      (e)=> console.log(e['error']['message']));
  }

}
