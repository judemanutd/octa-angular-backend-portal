import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CategoriesService } from '~services/categories.service';

@Component({
  selector: 'app-add-categories-modal',
  templateUrl: './add-categories-modal.component.html',
  styleUrls: ['./add-categories-modal.component.scss'],
})
export class AddCategoriesModalComponent {
  AddFormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AddCategoriesModalComponent>,
    private categoriesService: CategoriesService,
  ) {}

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  addCategories() {
    /* Onsubmit of add modal form */
    const categoryName = this.AddFormGroup.value.name;
    const payload = {
      name: categoryName,
    };
    this.categoriesService.addCategory(payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
       * which allows us to refresh the table
       */
      this.dialogRef.close('refresh');
    });
  }
}
