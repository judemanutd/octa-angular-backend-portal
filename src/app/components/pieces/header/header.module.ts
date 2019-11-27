import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '~app/material.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  entryComponents: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
