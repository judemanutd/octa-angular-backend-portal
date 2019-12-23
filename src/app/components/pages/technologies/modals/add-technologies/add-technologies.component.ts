import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TechnologiesService } from '~app/services/technologies.service';
import { CategoriesService } from '~app/services/categories.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import IResponse from '~app/interfaces/IResponse';
import { Category } from '~app/interfaces/Category';

@Component({
  selector: 'app-add-technologies',
  templateUrl: './add-technologies.component.html',
  styleUrls: ['./add-technologies.component.scss'],
})
export class AddTechnologiesComponent implements OnInit {
  progressRef: NgProgressRef;
  AddFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('category', Validators.required),
    icon_type: new FormControl(''),
    icon_name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AddTechnologiesComponent>,
    private technologiesService: TechnologiesService,
    private categoriesService: CategoriesService,
    private progress: NgProgress,
  ) {}
  public category: Category[] = [];

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
    if (this.AddFormGroup.valid) {
      this.progressRef.start();
      /* Onsubmit of add modal form */
      const technologyName = this.AddFormGroup.value.name;
      const categoryId = this.AddFormGroup.value.category;
      const icon_name = this.AddFormGroup.value.icon_name;
      const icon_type = this.AddFormGroup.value.icon_type;
      console.log('TCL: AddTechnologiesComponent -> addTechnology -> categoryId', categoryId);

      const payload = {
        name: technologyName,
        category: categoryId,
        icon_type: '',
        icon_name: '',
      };

      if (icon_name && icon_type) {
        payload.icon_type = icon_type;
        payload.icon_name = icon_name;
      }
      this.technologiesService.addTechnology(payload).subscribe((result: any) => {
        /* Successful call send "refresh" to modal close event binder
         * which allows us to refresh the table
         */
        this.dialogRef.close('refresh');
        this.progressRef.complete();
      });
    }
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((result: IResponse<Category[]>) => {
      this.category.push(...result.payload);
    });
  }
}
