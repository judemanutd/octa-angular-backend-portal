import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { TechnologiesService } from '~app/services/technologies.service';
import { Technology } from '~app/interfaces/Technology';
import { Category } from '~app/interfaces/Category';
import IResponse from '~app/interfaces/IResponse';

@Component({
  selector: 'app-edit-technologies',
  templateUrl: './edit-technologies.component.html',
  styleUrls: ['./edit-technologies.component.scss'],
})
export class EditTechnologiesComponent implements OnInit {
  EditFormGroup = new FormGroup({
    name: new FormControl(this.data.name),
    category: new FormControl(this.data.category),
    icon_type: new FormControl(this.data.icon !== null ? this.data.icon.type : ''),
    icon_name: new FormControl(this.data.icon !== null ? this.data.icon.name : ''),
  });

  constructor(
    public dialogRef: MatDialogRef<EditTechnologiesComponent>,
    private categoriesService: CategoriesService,
    private technologiesService: TechnologiesService,
    @Inject(MAT_DIALOG_DATA) public data: Technology,
  ) {
    this.selected = data.category;
    this.category.push(data.category);
    this.technology = data;
  }
  public category: Category[] = [];
  public selected: Category;
  public technology: Technology;
  ngOnInit() {
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editTechnologies() {
    const technologyName = this.EditFormGroup.value.name;
    const categoryId = this.EditFormGroup.value.category.id;
    const icon_name = this.EditFormGroup.value.icon_name;
    const icon_type = this.EditFormGroup.value.icon_type;
    const id = this.data.id;

    const payload: any = {
      name: technologyName,
      category: categoryId,
    };

    if (icon_name && icon_type) {
      payload.icon_type = icon_type;
      payload.icon_name = icon_name;
    }

    this.technologiesService.editTechnology(id, payload).subscribe(() => {
      this.dialogRef.close('refresh');
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((result: IResponse<Category[]>) => {
      const categories = result.payload;
      this.category.push(...categories.filter(category => category.id !== this.selected.id));
    });
  }
}
