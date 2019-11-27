import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { Category } from '~app/interfaces/Category';

@Component({
  selector: 'app-edit-categories-modal',
  templateUrl: './edit-categories-modal.component.html',
  styleUrls: ['./edit-categories-modal.component.scss'],
})
export class EditCategoriesModalComponent {
  EditFormGroup = new FormGroup({
    name: new FormControl(this.data.name),
  });

  constructor(
    public dialogRef: MatDialogRef<EditCategoriesModalComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editCategories() {
    const categoryName = this.EditFormGroup.value.name;
    const id = this.data.id;
    const payload = {
      name: categoryName,
    };
    this.categoriesService.editCategory(id, payload).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }
}
