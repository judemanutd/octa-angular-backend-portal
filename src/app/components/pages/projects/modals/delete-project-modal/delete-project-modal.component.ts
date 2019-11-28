import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Project } from '~app/interfaces/Project';
import { ProjectsService } from '~app/services/projects.service';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss'],
})
export class DeleteProjectModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProjectModalComponent>,
    private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProject() {
    const id = this.data.id;
    this.projectsService.deleteProject(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }
}
