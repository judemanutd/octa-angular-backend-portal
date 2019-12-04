import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TechnologiesService } from '~app/services/technologies.service';
import { CategoriesService } from '~app/services/categories.service';
import IResponse from '~app/interfaces/IResponse';
import { Category } from '~app/interfaces/Category';

@Component({
  selector: 'app-add-technologies',
  templateUrl: './add-technologies.component.html',
  styleUrls: ['./add-technologies.component.scss'],
})
export class AddTechnologiesComponent implements OnInit {
  AddFormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl('category'),
    icon_type: new FormControl(''),
    icon_name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AddTechnologiesComponent>,
    private technologiesService: TechnologiesService,
    private categoriesService: CategoriesService,
  ) {}
  public category: Category[] = [];

  ngOnInit() {
    this.getCategories();
    console.log('TCL: AddTechnologiesComponent -> category', this.category);
  }

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  addTechnology() {
    /* Onsubmit of add modal form */
    const technologyName = this.AddFormGroup.value.name;
    const categoryId = this.AddFormGroup.value.category;
    const icon_name = this.AddFormGroup.value.icon_name;
    const icon_type = this.AddFormGroup.value.icon_type;
    const payload: any = {
      name: technologyName,
      category: categoryId,
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
    });
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((result: IResponse<Category[]>) => {
      this.category.push(...result.payload);
    });
  }
}
