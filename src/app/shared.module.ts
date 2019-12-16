import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import {
  MatSelectModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatNativeDateModule,
  MatProgressBarModule,
} from '@angular/material';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryModule } from '@ngx-gallery/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TitleModule } from './components/pieces/title/title.module';
import { HeaderModule } from './components/pieces/header/header.module';
import { TemplateModule } from './components/template/template.module';
import { SiteTemplateModule } from './components/layouts/site/site-template.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { AngularFireModule } from '@angular/fire';
import { environment } from '~environments/environment';
import { NgProgressModule } from '@ngx-progressbar/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MomentModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatSelectModule,
    MatDatepickerModule,
    CarouselModule,
    MatExpansionModule,
    MatGridListModule,
    WavesModule,
    MatNativeDateModule,
    LightboxModule,
    GalleryModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    AngularFireAuthModule,
    TitleModule,
    HeaderModule,
    TemplateModule,
    SiteTemplateModule,
    NgProgressModule,
    AngularFileUploaderModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [
    CommonModule,
    MomentModule,
    HttpClientModule,
    MaterialModule,
    MatSelectModule,
    MatDatepickerModule,
    CarouselModule,
    MatExpansionModule,
    MatGridListModule,
    WavesModule,
    MatNativeDateModule,
    LightboxModule,
    NgProgressModule,
    GalleryModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    AngularFireAuthModule,
    TitleModule,
    HeaderModule,
    TemplateModule,
    SiteTemplateModule,
    AngularFileUploaderModule,
    MatProgressBarModule,
  ],
  entryComponents: [],
  providers: [],
})
export class SharedModule {}
