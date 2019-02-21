import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { ContentComponent } from './content.component';
import { BaggagesComponent } from "./baggages/baggages.component";
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LocationComponent } from "./location/location.component";
import { ManagedTitlenameComponent } from "./managed-titlename/managed-titlename.component";

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
        path: "schedule",
        component: ScheduleComponent,
      },
      {
        path: "location",
        component: LocationComponent,
      },
      {
        path: "managedTitlename",
        component: ManagedTitlenameComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
