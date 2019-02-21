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
import { ScheduleComponent } from './schedule/schedule.component';
import {ConfirmationService} from 'primeng/api';
@NgModule({
  declarations: [
    ContentComponent,
    BaggagesComponent,
    CoursesComponent,
    CourseResgisterComponent,
    CourseFormComponent,
    CourseEditComponent,
    CourseCreateComponent,
    CoursesListComponent,
    CourseComponent,
    ScheduleComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ContentRoutingModule
  ],
  exports: [
    ContentComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class ContentModule { }
