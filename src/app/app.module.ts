import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthHttpInterceptor } from '~app/interceptors/auth.interceptor';
import { ErrorInterceptor } from '~app/interceptors/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { CategoriesModule } from '~app/components/pages/categories/categories.module';

import { AppLayoutComponent } from '~app/components/layouts/app/app-layout.component';
import { NoneLayoutComponent } from '~app/components/layouts/none/none-layout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from '~app/components/pages/login/login.component';
import { UsersComponent } from '~app/components/pages/users/users.component';
import { SidebarComponent } from '~app/components/pieces/sidebar/sidebar.component';
import { FooterComponent } from '~app/components/pieces/footer/footer.component';

import { TechnologiesComponent } from '~app/components/pages/technologies/technologies.component';
import { DashboardComponent } from '~app/components/pages/dashboard/dashboard.component';

import { AuthenticationService } from '~app/services/authentication.service';
import { AddTechnologiesComponent } from '~app/components/pages/technologies/modals/add-technologies/add-technologies.component';
import { EditTechnologiesComponent } from '~app/components/pages/technologies/modals/edit/edit-technologies.component';

import { MatDatepickerModule } from '@angular/material';
import { ClientComponent } from './components/pages/client/client.component';
import { AddClientModalComponent } from './components/pages/client/modals/add-client-modal/add-client-modal.component';
import { EditClientModalComponent } from './components/pages/client/modals/edit-client-modal/edit-client-modal.component';
import { DeleteClientModalComponent } from './components/pages/client/modals/delete-client-modal/delete-client-modal.component';
import { DeleteTechnologiesModalComponent } from './components/pages/technologies/modals/delete/delete-technologies.component';
import { ProjectModule } from './components/pages/projects/project.module';
import { SharedModule } from './shared.module';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { AddPortfolioComponent } from './components/pages/portfolio/add-portfolio/add-portfolio.component';
import { EditPortfolioComponent } from './components/pages/portfolio/edit-portfolio/edit-portfolio.component';
import { DeletePortfolioComponent } from './components/pages/portfolio/delete-portfolio/delete-portfolio.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppLayoutComponent,
    NoneLayoutComponent,
    UsersComponent,
    SidebarComponent,
    FooterComponent,
    AddTechnologiesComponent,
    EditTechnologiesComponent,

    TechnologiesComponent,
    DashboardComponent,
    ClientComponent,
    AddClientModalComponent,
    EditClientModalComponent,
    DeleteClientModalComponent,
    DeleteTechnologiesModalComponent,
    PortfolioComponent,
    AddPortfolioComponent,
    EditPortfolioComponent,
    DeletePortfolioComponent,
  ],
  entryComponents: [
    AddPortfolioComponent,
    AddTechnologiesComponent,
    EditTechnologiesComponent,
    DeleteTechnologiesModalComponent,
    AddClientModalComponent,
    EditClientModalComponent,
    DeleteClientModalComponent,
    EditPortfolioComponent,
    DeletePortfolioComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CategoriesModule,
    ProjectModule,
    SharedModule,
    FormsModule,
  ],
  exports: [MaterialModule],
  providers: [
    MatDatepickerModule,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent, AppLayoutComponent, SidebarComponent],
})
export class AppModule {}
