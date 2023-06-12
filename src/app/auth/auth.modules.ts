import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { NewpwdComponent } from './newpwd/newpwd.component';
const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'otp', component: OtpComponent },
            { path: 'newpwd', component: NewpwdComponent },
        ],
    },
];
@NgModule({
    declarations: [AuthComponent, LoginComponent, OtpComponent, NewpwdComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes), ReactiveFormsModule, FormsModule
    ]
})
export class AuthModule { }
