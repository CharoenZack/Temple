import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ],
  exports:[
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
