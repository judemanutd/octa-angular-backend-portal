import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { TechnologiesService } from '~app/services/technologies.service';
import { Technology } from '~app/interfaces/Technology';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-edit-technologies',
  templateUrl: './edit-technologies.component.html',
  styleUrls: ['./edit-technologies.component.scss'],
})
export class EditTechnologiesComponent implements OnInit {
  progressRef: NgProgressRef;
  EditFormGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    category: new FormControl(this.data.category, [Validators.required]),
  });
  selectedValue: any = this.data.category;

  constructor(
    public dialogRef: MatDialogRef<EditTechnologiesComponent>,
    private categoriesService: CategoriesService,
    private progress: NgProgress,
    private technologiesService: TechnologiesService,
    @Inject(MAT_DIALOG_DATA) public data: Technology,
  ) {}
  public category: [];
  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    console.log(this.data);
    this.getCategories();
    console.log('TCL: AddTechnologiesComponent -> category', this.category);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editTechnologies() {
    if (this.EditFormGroup.valid) {
      this.progressRef.start();
      const technologyName = this.EditFormGroup.value.name;
      const categoryId = this.EditFormGroup.value.category;
      const id = this.data.id;

      const payload = {
        name: technologyName,
        category: categoryId,
      };
      this.technologiesService.editTechnology(id, payload).subscribe((result: any) => {
        this.dialogRef.close('refresh');
        this.progressRef.complete();
      });
    }
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.category = result.payload;
      console.log(
        'TCL: AddTechnologiesComponent -> getCategories ->  this.category',
        this.category,
      );
    });
  }
}
