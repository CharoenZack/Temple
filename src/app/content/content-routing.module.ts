import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { ContentComponent } from './content.component';
import { BaggagesComponent } from "./baggages/baggages.component";
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditPersonalInfoComponent } from './personal-info/edit-personal-info/edit-personal-info.component';
import { LocationComponent } from "./location/location.component";
import { ManagedTitlenameComponent } from "./managed-titlename/managed-titlename.component";
import { AuthGuard } from '../shared/guard/auth.guard';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RegisterComponent } from '../auth/register/register.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: HomeComponent,
      },
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
          }
        ]
      },
      {
        path: "baggages",
        component: BaggagesComponent,
      },
      {
        path: "profile/:id",
        component: ProfileComponent,
      },
      {
        path: "profile/:id/edit",
        component: EditFormComponent,
        data: { urlback:'/profile/'}
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
      },
      {
        path: "users",
        component: ManageUserComponent,
      },
      {
        path: "user/:id/edit",
        component: EditPersonalInfoComponent,
        data: { formType: 'EditAdmin' }
      },
      {
        path: "user/create",
        component: RegisterComponent,
        data: { formType: 'RegisterAdmin' }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
