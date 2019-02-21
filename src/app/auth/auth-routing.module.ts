import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";

const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent,
        children: [
            {
                path: "",
                redirectTo: "login",
                pathMatch: 'full'
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "register",
                component: RegisterComponent,
                data:{formType:'Register'}
            },
            {
                path: "forget-password",
                component: ForgetPasswordComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
