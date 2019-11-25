import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { MaterialModule } from '~app/material.module';
import { TitleModule } from '../../pieces/title/title.module';
import { HeaderModule } from '../../pieces/header/header.module';

import { AddCategoriesModalComponent } from './modals/add/add-categories-modal.componenet';
import { EditCategoriesModalComponent } from './modals/edit/edit-categories-modal.component';
import { DeleteCategoriesModalComponent } from './modals/delete/delete-categories-modal.component';

import { CategoriesComponent } from './categories.component';
import { AddTechnologiesComponent } from './modals/add/add-technologies/add-technologies.component';

@NgModule({
  declarations: [
    AddCategoriesModalComponent,
    EditCategoriesModalComponent,
    DeleteCategoriesModalComponent,
    CategoriesComponent,
    AddTechnologiesComponent,
  ],
  entryComponents: [
    AddCategoriesModalComponent,
    EditCategoriesModalComponent,
    DeleteCategoriesModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentModule,
    TitleModule,
    HeaderModule,
  ],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}
