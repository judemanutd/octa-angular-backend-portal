import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Project } from '~app/interfaces/Project';
import { ProjectsService } from '~app/services/projects.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss'],
})
export class DeleteProjectModalComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    public dialogRef: MatDialogRef<DeleteProjectModalComponent>,
    private projectsService: ProjectsService,
    private progress: NgProgress,
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
  }

  deleteProject() {
    this.progressRef.start();
    const id = this.data.id;
    this.projectsService.deleteProject(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
      this.progressRef.complete();
    });
  }
}
