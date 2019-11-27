import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TechnologiesService } from '~app/services/technologies.service';
import { CategoriesService } from '~app/services/categories.service';

@Component({
  selector: 'app-add-technologies',
  templateUrl: './add-technologies.component.html',
  styleUrls: ['./add-technologies.component.scss'],
})
export class AddTechnologiesComponent implements OnInit {
  AddFormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl('category'),
  });

  constructor(
    public dialogRef: MatDialogRef<AddTechnologiesComponent>,
    private technologiesService: TechnologiesService,
    private categoriesService: CategoriesService,
  ) {}
  private category: [];

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
    });
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.category = result.payload;
    });
  }
}
