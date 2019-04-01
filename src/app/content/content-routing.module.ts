import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CourseComponent} from './courses/course/course.component';
import {ContentComponent} from './content.component';
import {BaggagesComponent} from './baggages/baggages.component';
import {CoursesComponent} from './courses/courses.component';
import {CoursesListComponent} from './courses/courses-list/courses-list.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {LocationComponent} from './location/location.component';
import {ManagedTitlenameComponent} from './managed-titlename/managed-titlename.component';
import {AuthGuard} from '../shared/guard/auth.guard';
import {ManageUserComponent} from './manage-user/manage-user.component';
import {EditFormComponent} from './edit-form/edit-form.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterFormComponent} from '../auth/register-form/register-form.component';
import {ApprovalComponent} from './approval/approval.component';
import {ManageCourseComponent} from './manage-course/manage-course.component';
import {CourseCreateComponent} from './courses/course-create/course-create.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
        children: [
          {
            path: '',
            component: CoursesListComponent,
          },
          {
            path: ':id',
            component: CourseComponent,
          }
        ]
      },

      {
        path: 'baggages',
        component: BaggagesComponent,
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      {
        path: 'profile/:id/edit',
        component: EditFormComponent,
        data: {urlback: '/profile/'}
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'location',
        component: LocationComponent,
      },
      {
        path: 'manageTitlename',
        component: ManagedTitlenameComponent,
      },
      {
        path: 'users',
        component: ManageUserComponent,
      },
      {
        path: 'user/create',
        component: RegisterFormComponent,
      },
      {
        path: 'approval',
        component: ApprovalComponent,
      },
      {
        path: 'manageCourse',
        component: ManageCourseComponent
      },
      {
        path: 'createCourse',
        component: CourseCreateComponent
      }

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}
