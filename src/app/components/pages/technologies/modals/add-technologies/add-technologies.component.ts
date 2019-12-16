import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TechnologiesService } from '~app/services/technologies.service';
import { CategoriesService } from '~app/services/categories.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-add-technologies',
  templateUrl: './add-technologies.component.html',
  styleUrls: ['./add-technologies.component.scss'],
})
export class AddTechnologiesComponent implements OnInit {
  progressRef: NgProgressRef;
  AddFormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl('category'),
  });

  constructor(
    public dialogRef: MatDialogRef<AddTechnologiesComponent>,
    private technologiesService: TechnologiesService,
    private categoriesService: CategoriesService,
    private progress: NgProgress,
  ) {}
  public category: [];

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.getCategories();
    console.log('TCL: AddTechnologiesComponent -> category', this.category);
  }

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  addTechnology() {
    this.progressRef.start();
    /* Onsubmit of add modal form */
    const technologyName = this.AddFormGroup.value.name;
    const categoryId = this.AddFormGroup.value.category;
    console.log('TCL: AddTechnologiesComponent -> addTechnology -> categoryId', categoryId);
    const payload = {
      name: technologyName,
      category: categoryId,
    };
    this.technologiesService.addTechnology(payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
       * which allows us to refresh the table
       */
      this.dialogRef.close('refresh');
      this.progressRef.complete();
    });
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.category = result.payload;
    });
  }
}
