import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseResgisterComponent } from './course-resgister/course-resgister.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseResgisterComponent,
    CourseFormComponent,
    CourseEditComponent,
    CourseCreateComponent,
    CoursesListComponent,
    CourseComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class CoursesModule { }
