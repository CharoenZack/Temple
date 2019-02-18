import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from "./auth-routing.module";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
@NgModule({
  declarations: [
    AuthComponent, 
    LoginComponent, 
    RegisterComponent, 
    ForgetPasswordComponent
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
