import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton'
import { DropdownModule } from 'primeng/dropdown';
import { TitleNameService } from './service/title-name.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { SidebarModule } from 'primeng/sidebar';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { StepsModule } from 'primeng/steps';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CookieService } from 'ngx-cookie-service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faBars,
  faBookOpen,
  faArchive,
  faLock,
  faLandmark,
  faPlus,
  faUsers,
  faAt
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faIdCard
} from '@fortawesome/free-regular-svg-icons';

import { ProfileFormService } from './service/profile-form.service';

import { ProfileFormComponent } from './component/profile-form/profile-form.component';
import { ConfirmButtonComponent } from './component/profile-form/confirm-button/confirm-button.component';

import { RegisterInputModule } from '../auth/register/register-input/register-input.module';
import { PersonalInfoService } from './service/personal-info.service';


@NgModule({
  declarations: [
    ProfileFormComponent,
    ConfirmButtonComponent
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
    ToastModule,
    FormsModule,
    RegisterInputModule,
    FileUploadModule,
    HttpClientModule,
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
    StepsModule,
    FormsModule,
    FullCalendarModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    FullCalendarModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    TitleNameService,
    MessageService,
    ProfileFormService,
    PersonalInfoService,
    CookieService,
  ]
})
export class SharedModule {
  constructor() {
    library.add(
      faUser,
      faBars,
      faBookOpen,
      faArchive,
      faLock,
      faCalendarAlt,
      faLandmark,
      faPlus,
      faIdCard,
      faAt,
      faUsers
    );
  }
}
