import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {} from '@angular/material';
import {} from '~app/interfaces/Project';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.scss'],
})
export class EditProjectModalComponent {
  EditFormGroup = new FormGroup({
    name: new FormControl(''),
    client: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    cost: new FormControl(''),
    currency: new FormControl(''),
  });
  files: File[];

  constructor() // private projectsService: ProjectsService, // @Inject(MAT_DIALOG_DATA) public data: Project,
  {
    console.log('sdsd');
  }

  editProjects() {
    // const categoryName = this.EditFormGroup.value.name;
    // // const id = this.data.id;
    // const payload = {
    //   name: categoryName,
    // };
    // // this.projectsService.editProject(id, payload).subscribe((result: any) => {});
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
