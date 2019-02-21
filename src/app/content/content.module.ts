import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseResgisterComponent } from './courses/course-resgister/course-resgister.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseCreateComponent } from './courses/course-create/course-create.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseComponent } from './courses/course/course.component';

import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { ContentRoutingModule } from "./content-routing.module";
import { BaggagesComponent } from './baggages/baggages.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditPersonalInfoComponent } from './personal-info/edit-personal-info/edit-personal-info.component';
@NgModule({
  declarations: [
    ContentComponent,
    PersonalInfoComponent,
    BaggagesComponent,
    CoursesComponent,
    CourseResgisterComponent,
    CourseFormComponent,
    CourseEditComponent,
    CourseCreateComponent,
    CoursesListComponent,
    CourseComponent,
    ScheduleComponent,
    EditPersonalInfoComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ContentRoutingModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
