import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { ContentComponent } from './content.component';
import { BaggagesComponent } from "./baggages/baggages.component";
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditPersonalInfoComponent } from './personal-info/edit-personal-info/edit-personal-info.component';

const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    children: [
      {
        path: "courses",
        component: CoursesComponent,
        children:[
          {
            path: "",
            component:CoursesListComponent,
          },
          {
            path: ":id",
            component:CourseComponent,
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
        path: "profile/:id/edit",
        component: EditPersonalInfoComponent,
        data:{formType:'Edit'}
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
