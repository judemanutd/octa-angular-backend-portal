import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { Category } from '~app/interfaces/Category';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-edit-categories-modal',
  templateUrl: './edit-categories-modal.component.html',
  styleUrls: ['./edit-categories-modal.component.scss'],
})
export class EditCategoriesModalComponent implements OnInit {
  progressRef: NgProgressRef;
  EditFormGroup = new FormGroup({
    name: new FormControl(this.data.name),
  });

  constructor(
    public dialogRef: MatDialogRef<EditCategoriesModalComponent>,
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

  editCategories() {
    this.progressRef.start();
    const categoryName = this.EditFormGroup.value.name;
    const id = this.data.id;
    const payload = {
      name: categoryName,
    };
    this.categoriesService.editCategory(id, payload).subscribe((result: any) => {
      this.dialogRef.close('refresh');
      this.progressRef.complete();
    });
  }
}
