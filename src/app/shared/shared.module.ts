import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileFormComponent} from './component/profile-form/profile-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton'
import {DropdownModule} from 'primeng/dropdown';
import {TitleNameService } from './service/title-name.service';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { SidebarModule } from 'primeng/sidebar';
import { PasswordModule } from 'primeng/password';
import {TableModule} from 'primeng/table';
import {StepsModule} from 'primeng/steps';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faBars, faBookOpen, faArchive, faLock } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';


@NgModule({
  declarations: [
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule,
    ToastModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    ButtonModule,
    ProfileFormComponent,
    RadioButtonModule,
    DropdownModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    ToastModule,
    SidebarModule,
    PasswordModule,
    FontAwesomeModule,
    TableModule,
    StepsModule

  ],
  providers: [TitleNameService,MessageService]
})
export class SharedModule {
}
