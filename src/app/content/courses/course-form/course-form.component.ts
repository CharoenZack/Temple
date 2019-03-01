import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/course.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  displayDialog: boolean;
  newCourse : boolean;
  courses: Course[];
  course: Course;
  cols: any[];
  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    //this.courses = this.courseService.getCourses();
    this.cols = [
      {field: 'date',header: 'วันที่'},
      {field: 'name',header: 'ชื่อคอร์ส'},
      {field: 'location ',header:'สถานที่'},
      {field: 'annotation',header:'หมายเหตุ'},
    ]
  }
  showDialogToAdd() {
    this.newCourse  = true;
    this.course  = {};
    this.displayDialog = true;
  }

  save() {
    console.log(this.course );
    
    //this.courses = this.courseService.save(this.course .name);
    this.course  = {};
    this.displayDialog = false;
  }
  clear() {
    this.course  = {};
  }
  showEdit(id) {
    this.newCourse  = false;
    this.course  =this.courses.filter(e => e.id == id)[0]
    this.displayDialog = true;
}
  delete(id){
    this.courseService.delete(id);

  }

}
