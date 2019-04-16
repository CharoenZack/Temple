import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from "./auth-routing.module";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AuthComponent, 
    LoginComponent, 
    ForgetPasswordComponent, 
    RegisterFormComponent, RegisterComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  exports:[
    AuthComponent
  ]
  
})
export class AuthModule { }
