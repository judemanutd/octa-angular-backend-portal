import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '~app/material.module';

import { TitleComponent } from './title.component';

@NgModule({
  declarations: [TitleComponent],
  entryComponents: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [TitleComponent],
})
export class TitleModule {}
