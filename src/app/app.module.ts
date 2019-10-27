import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from '../components/pages/login/login.component';
import { TemplateComponent } from '../components/template/template.component';
import { UsersComponent } from '../components/pages/users/users.component';
import { HeaderComponent } from '../components/pieces/header/header.component';
import { SidebarComponent } from '../components/pieces/sidebar/sidebar.component';
import { FooterComponent } from '../components/pieces/footer/footer.component';
import { CategoriesComponent } from '../components/pages/categories/categories.component';
import { TitleComponent } from '../components/pieces/title/title.component';
import { TechnologiesComponent } from '../components/pages/technologies/technologies.component';
import { DashboardComponent } from '../components/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateComponent,
    UsersComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CategoriesComponent,
    TitleComponent,
    TechnologiesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
