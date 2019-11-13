import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentModule } from './content/content.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './shared/service/auth.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    ContentModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    FullCalendarModule
  ],
  providers: [AuthService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
