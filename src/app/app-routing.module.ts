import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlandComponent } from './addland/addland.component';
import { EditlandComponent } from './editland/editland.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewpwdComponent } from './newpwd/newpwd.component';
import { OtpComponent } from './otp/otp.component';
import { Report1LAComponent } from './report1-la/report1-la.component';
import { Report2LPComponent } from './report2-lp/report2-lp.component';
import { ViewlandComponent } from './viewland/viewland.component';


const routes: Routes = [
  {path: '',pathMatch: 'full',component: LoginComponent},
  {path: 'otp',pathMatch: 'full',component: OtpComponent},
  {path: 'newpwd',pathMatch: 'full',component: NewpwdComponent},
  {path: 'home',pathMatch: 'full',component: HomeComponent},
  {path: 'add',pathMatch: 'full',component: AddlandComponent},
  {path: 'view',pathMatch: 'full',component: ViewlandComponent},
  {path: 'edit/:id',pathMatch: 'full',component: EditlandComponent},
  {path: 'report1LA',pathMatch: 'full',component: Report1LAComponent},
  {path: 'report2LP',pathMatch: 'full',component: Report2LPComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
