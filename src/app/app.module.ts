import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './land/home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Report1LAComponent } from './reports/report1-la/report1-la.component';
import { Report2LPComponent } from './reports/report2-lp/report2-lp.component';
import { RouterModule } from '@angular/router';
import { AddlandComponent } from './land/addland/addland.component';
import { EditlandComponent } from './land/editland/editland.component';
import { ViewlandComponent } from './land/viewland/viewland.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandComponent } from './land/land.component';
import { ReportsComponent } from './reports/reports.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    Report1LAComponent,
    Report2LPComponent,
    AddlandComponent,
    EditlandComponent,
    ViewlandComponent,
    LandComponent,
    ReportsComponent,
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
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


