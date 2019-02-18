import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileFormComponent} from './component/profile-form/profile-form.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule} from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  declarations: [
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    ButtonModule,
    SidebarModule
  ]
})
export class SharedModule {
}
