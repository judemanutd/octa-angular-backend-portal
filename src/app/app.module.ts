import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { AuthHttpInterceptor } from '~app/interceptors/auth.interceptor';
import { ErrorInterceptor } from '~app/interceptors/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { CategoriesModule } from '~app/components/pages/categories/categories.module';
import { TitleModule } from '~app/components/pieces/title/title.module';
import { HeaderModule } from '~app/components/pieces/header/header.module';
import { TemplateModule } from '~app/components/template/template.module';
import { SiteTemplateModule } from '~app/components/layouts/site/site-template.module';

import { AppLayoutComponent } from '~app/components/layouts/app/app-layout.component';
import { NoneLayoutComponent } from '~app/components/layouts/none/none-layout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from '~app/components/pages/login/login.component';
import { UsersComponent } from '~app/components/pages/users/users.component';
import { SidebarComponent } from '~app/components/pieces/sidebar/sidebar.component';
import { FooterComponent } from '~app/components/pieces/footer/footer.component';

import { TechnologiesComponent } from '~app/components/pages/technologies/technologies.component';
import { DashboardComponent } from '~app/components/pages/dashboard/dashboard.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AuthenticationService } from '~app/services/authentication.service';
import { AddTechnologiesComponent } from '~app/components/pages/technologies/modals/add-technologies/add-technologies.component';
import { EditTechnologiesComponent } from '~app/components/pages/technologies/modals/edit/edit-technologies.component';

import { MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ClientComponent } from './components/pages/client/client.component';
import { AddClientModalComponent } from './components/pages/client/modals/add-client-modal/add-client-modal.component';
import { EditClientModalComponent } from './components/pages/client/modals/edit-client-modal/edit-client-modal.component';
import { DeleteClientModalComponent } from './components/pages/client/modals/delete-client-modal/delete-client-modal.component';
import { DeleteTechnologiesModalComponent } from './components/pages/technologies/modals/delete/delete-technologies.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { AddProjectModalComponent } from './components/pages/projects/modals/add-project-modal/add-project-modal.component';
import { EditProjectModalComponent } from './components/pages/projects/modals/edit-project-modal/edit-project-modal.component';
import { DeleteProjectModalComponent } from './components/pages/projects/modals/delete-project-modal/delete-project-modal.component';
import { FileUploadComponent } from './components/pieces/file-upload/file-upload.component';

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
    ProjectsComponent,
    AddProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent,
    FileUploadComponent,
  ],
  entryComponents: [
    AddTechnologiesComponent,
    EditTechnologiesComponent,
    DeleteTechnologiesModalComponent,
    AddClientModalComponent,
    EditClientModalComponent,
    DeleteClientModalComponent,
    AddProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MomentModule,
    HttpClientModule,
    MaterialModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TitleModule,
    HeaderModule,
    TemplateModule,
    SiteTemplateModule,
    AngularFileUploaderModule,
    CategoriesModule,
    AppRoutingModule,
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
