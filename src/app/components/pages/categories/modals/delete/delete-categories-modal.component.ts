import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { Category } from '~app/interfaces/Category';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-delete-categories-modal',
  templateUrl: './delete-categories-modal.component.html',
  styleUrls: ['./delete-categories-modal.component.scss'],
})
export class DeleteCategoriesModalComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoriesModalComponent>,
    private categoriesService: CategoriesService,
    private progress: NgProgress,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
  }

  deleteCategories() {
    this.progressRef.start();
    const id = this.data.id;
    this.categoriesService.deleteCategory(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
      this.progressRef.complete();
    });
  }
}
