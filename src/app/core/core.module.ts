import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarService } from './service/sidebar.service';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [SidebarService],
  exports: [
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
