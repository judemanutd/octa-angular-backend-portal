import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { MaterialModule } from '~app/material.module';

import { TemplateComponent } from './template.component';

@NgModule({
  declarations: [TemplateComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MomentModule],
  exports: [TemplateComponent],
})
export class SiteTemplateModule {}
