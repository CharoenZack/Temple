import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';

import { SharedModule } from "../shared/shared.module";
import { ContentRoutingModule } from "./content-routing.module";
import { CoursesModule } from "./courses/courses.module";
@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    SharedModule,
    CoursesModule,
    ContentRoutingModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
