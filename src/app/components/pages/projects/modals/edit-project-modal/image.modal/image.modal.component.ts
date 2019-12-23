import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from '~app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '~app/interfaces/Project';
import { ComponentsService } from '~app/services/components.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image.modal.component.html',
  styleUrls: ['./image.modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  param1: any;
  uploadForm: FormGroup;
  image: any;

  constructor(
    private componentService: ComponentsService,
    public dialogRef: MatDialogRef<ImageModalComponent>,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {
    console.log('TCL: ImageModalComponent -> data', this.data);
    this.param1 = this.route.snapshot.params.id;
    console.log('TCL: ImageModalComponent -> this.route.snapshot.params', this.route);
  }
  public category: [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
    this.uploadForm = this.fb.group({
      image: [''],
      name: new FormControl(''),
      desc: new FormControl(''),
    });
  }

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
  }

  addImage() {
    /* Onsubmit of add modal form */

    const formData = new FormData();
    formData.append('gallery', this.uploadForm.get('image').value);
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('description', this.uploadForm.get('desc').value);
    // formData.append('file', this.uploadForm.get('cover').value);
    if (this.data.projectImage) {
      this.projectsService.addGallery(this.data.project, formData).subscribe((result: any) => {
        console.log(result);
        // this.image = result.payload.link;
        this.dialogRef.close('refresh');
      });
    } else {
      this.componentService
        .addGallery(this.data.project, this.data.component, formData)
        .subscribe((result: any) => {
          console.log(result);
          // this.image = result.payload.link;
          this.dialogRef.close('refresh');
        });
    }

    // this.technologiesService.addTechnology(payload).subscribe((result: any) => {
    //   /* Successful call send "refresh" to modal close event binder
    //    * which allows us to refresh the table
    //    */
    //   this.dialogRef.close('refresh');
    // });
  }
}
