import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from '~app/services/projects.service';
import { Project } from '~app/interfaces/Project';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.scss'],
})
export class EditProjectModalComponent {
  EditFormGroup = new FormGroup({
    name: new FormControl(this.data.name),
    client: new FormControl(this.data.clientId),
    start: new FormControl(this.data.startDate),
    end: new FormControl(this.data.endDate),
    cost: new FormControl(this.data.cost),
    currency: new FormControl(this.data.currency),
  });

  constructor(
    private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {
    console.log('sdsd');
  }

  editProjects() {
    const categoryName = this.EditFormGroup.value.name;
    const id = this.data.id;
    const payload = {
      name: categoryName,
    };
    this.projectsService.editProject(id, payload).subscribe((result: any) => {});
  }
}
