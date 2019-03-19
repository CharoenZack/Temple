import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { RegisterFormComponent } from './register-form/register-form.component';

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
                component: RegisterFormComponent,
                data: { urlback: '/auth/login' }
            },
            {
                path: "forget-password",
                component: ForgetPasswordComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
