import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { Portfolio } from '~app/interfaces/Portfolio';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.scss'],
})
export class EditPortfolioComponent implements OnInit {
  EditFormGroup = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
    componentId: new FormControl(this.data.componentId),
    technologyId: new FormControl(this.data.technologyId),
    categoryId: new FormControl(this.data.categoryId),
    projectId: new FormControl(this.data.projectId),
  });
  project: any;
  component: any;
  technology: any;
  category: any;

  constructor(
    public dialogRef: MatDialogRef<EditPortfolioComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Portfolio,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log('TCL: EditPortfolioComponent -> this.data', this.data);
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
