import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course
  public menu: MenuItem[];

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
      this.menu = [
        { label: '',icon:"pi pi-home",url:'/'},
        { label: 'Course : ตารางคอร์ส' },
      ];
  }


}
