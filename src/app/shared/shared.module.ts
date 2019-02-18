import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileFormComponent } from './component/profile-form/profile-form.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
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
    FontAwesomeModule,
    TableModule
  ],
  exports: [
    ProfileFormComponent,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    SidebarModule,
    ButtonModule,
    FontAwesomeModule,
    TableModule
  ]
})
export class SharedModule {
  constructor() {
    library.add(faUser, faBars);
  }
}
