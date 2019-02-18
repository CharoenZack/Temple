import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    SidebarComponent, 
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
