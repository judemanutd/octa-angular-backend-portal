import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-add-categories-modal',
  templateUrl: './add-categories-modal.component.html',
  styleUrls: ['./add-categories-modal.component.scss'],
})
export class AddCategoriesModalComponent implements OnInit {
  progressRef: NgProgressRef;
  AddFormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AddCategoriesModalComponent>,
    private progress: NgProgress,
    private categoriesService: CategoriesService,
  ) {}

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
  }

  addCategories() {
    this.progressRef.start();
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
      this.progressRef.complete();
    });
  }
}
