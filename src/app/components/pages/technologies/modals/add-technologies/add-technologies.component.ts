import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['SPA'];
  allTags: string[] = ['SSR', 'SPA', 'Web App'];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<AddTechnologiesComponent>,
    private technologiesService: TechnologiesService,
    private categoriesService: CategoriesService,
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }
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

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
