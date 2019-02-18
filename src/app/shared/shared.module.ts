import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileFormComponent} from './component/profile-form/profile-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  declarations: [
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    SidebarModule,
    ButtonModule
  ]
})
export class SharedModule {
}
