import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';

import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { ContentRoutingModule } from "./content-routing.module";
import { CoursesModule } from "./courses/courses.module";
@NgModule({
  declarations: [
    ContentComponent
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
