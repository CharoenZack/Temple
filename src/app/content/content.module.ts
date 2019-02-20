import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';

import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { ContentRoutingModule } from "./content-routing.module";
import { CoursesModule } from "./courses/courses.module";
import { BaggagesComponent } from './baggages/baggages.component';
import { ScheduleComponent } from './schedule/schedule.component';
@NgModule({
  declarations: [
    ContentComponent,
    BaggagesComponent,
    ScheduleComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CoursesModule,
    ContentRoutingModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
