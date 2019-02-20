import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { ContentComponent } from './content.component';
import { BaggagesComponent } from "./baggages/baggages.component";
import { PersonalInfoComponent } from './personal-info/personal-info.component';

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
        path: "profile/:id",
        component: PersonalInfoComponent,
        data:{formType:'Profile'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
