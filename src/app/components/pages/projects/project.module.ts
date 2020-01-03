import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { AddProjectModalComponent } from './modals/add-project-modal/add-project-modal.component';
import { EditProjectModalComponent } from './modals/edit-project-modal/edit-project-modal.component';
import { DeleteProjectModalComponent } from './modals/delete-project-modal/delete-project-modal.component';
import { ImageModalComponent } from './modals/edit-project-modal/image.modal/image.modal.component';
import { ComponentComponent } from './component/component.component';
import { ViewComponent } from './component/view/view.component';
import { SharedModule } from '~app/shared.module';
// import { ProjectRoutingModule } from './project-routing.module';
import { AppRoutingModule } from '~app/app-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    ProjectsComponent,
    AddProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent,
    ImageModalComponent,
    ComponentComponent,
    ViewComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule, AngularEditorModule],
  entryComponents: [
    ImageModalComponent,
    AddProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent,
  ],
})
export class ProjectModule {}
