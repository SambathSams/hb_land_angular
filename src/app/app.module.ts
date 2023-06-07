import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { NewpwdComponent } from './newpwd/newpwd.component';
import { Report1LAComponent } from './report1-la/report1-la.component';
import { Report2LPComponent } from './report2-lp/report2-lp.component';
import { RouterModule } from '@angular/router';
import { AddlandComponent } from './addland/addland.component';
import { EditlandComponent } from './editland/editland.component';
import { ViewlandComponent } from './viewland/viewland.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    OtpComponent,
    NewpwdComponent,
    Report1LAComponent,
    Report2LPComponent,
    AddlandComponent,
    EditlandComponent,
    ViewlandComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatExpansionModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


