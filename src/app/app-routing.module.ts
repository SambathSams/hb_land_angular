import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlandComponent } from './land/addland/addland.component';
import { EditlandComponent } from './land/editland/editland.component';
import { HomeComponent } from './land/home/home.component';
import { Report1LAComponent } from './reports/report1-la/report1-la.component';
import { Report2LPComponent } from './reports/report2-lp/report2-lp.component';
import { ViewlandComponent } from './land/viewland/viewland.component';
import { AuthModule } from './auth/auth.modules';

const routes: Routes = [
  { path: 'auth', loadChildren: () => (import('./auth/auth.modules')).then((m) => m.AuthModule) },

  {path: 'home',component: HomeComponent},
  {path: 'add',component: AddlandComponent},
  {path: 'view/:id',component: ViewlandComponent},
  {path: 'edit/:id',component: EditlandComponent},
  {path: 'report1LA',component: Report1LAComponent},
  {path: 'report2LP',component: Report2LPComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
