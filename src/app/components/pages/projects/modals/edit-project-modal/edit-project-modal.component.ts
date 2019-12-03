import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {} from '@angular/material';
import {} from '~app/interfaces/Project';
import { ProjectsService } from '~app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

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
    file: new FormControl(''),
  });
  fileToUpload: File = null;
  param1: any;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute, // @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {
    this.param1 = this.route.snapshot.params.id;
    console.log('TCL: EditProjectModalComponent -> this.param1', this.param1);
    console.log('sdsd');
  }

  editProjects() {
    const categoryName = this.EditFormGroup.value.name;
    const file = this.EditFormGroup.value.file;
    const payload = {
      logo: file,
    };
    this.projectsService.addLogo(this.param1, payload).subscribe((result: any) => {});
  }

  handleLogoInput(files: FileList) {
    this.EditFormGroup.value.file = files.item(0);
  }

  uploadFileToActivity() {
    this.projectsService.addLogo(this.param1, this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
      },
      error => {
        console.log(error);
      },
    );
  }
}
