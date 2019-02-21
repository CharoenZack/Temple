import { NgModule } from '@angular/core';
import { RegisterInputComponent } from './register-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    RegisterInputComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule
  ],
  exports: [
    RegisterInputComponent
  ]

})
export class RegisterInputModule {

}
