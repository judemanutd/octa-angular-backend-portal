import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { Category } from '~app/interfaces/Category';

@Component({
  selector: 'app-delete-categories-modal',
  templateUrl: './delete-categories-modal.component.html',
  styleUrls: ['./delete-categories-modal.component.scss'],
})
export class DeleteCategoriesModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoriesModalComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCategories() {
    const id = this.data.id;
    this.categoriesService.deleteCategory(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }
}
