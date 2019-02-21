import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { ContentComponent } from './content.component';
import { BaggagesComponent } from "./baggages/baggages.component";
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "courses",
        component: CoursesComponent,
        children: [
          {
            path: "",
            component: CoursesListComponent,
          },
          {
            path: ":id",
            component: CourseComponent,
          },
        ]
      },
      {
        path: "baggages",
        component: BaggagesComponent,
      },
      {
        path: "profile/:id",
        component: PersonalInfoComponent,
        data:{formType:'Profile'}
      },
      {
        path: "schedule",
        component: ScheduleComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
