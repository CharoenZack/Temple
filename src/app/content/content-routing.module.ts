import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { ContentComponent } from './content.component';
import { BaggagesComponent } from "./baggages/baggages.component";
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    children: [
      {
        path: "courses",
        component: CourseComponent,
      },
      {
        path: "baggages",
        component: BaggagesComponent,
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
