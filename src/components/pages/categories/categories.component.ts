import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CategoriesService } from "../../../services/categories.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = ["name", "updatedAt", "createdAt", "action"];
  dataSource = new MatTableDataSource<CategoryList>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    // Call to fetch all Categories on page load
    this.getCategories();
  }

  getCategories() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.dataSource = result.payload;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(AddCategoriesModalComponent, {
      width: "50rem"
    });

    /* Runs when the modal ref created above closes
     * using this functionality to run successful API calls
     * If the call is successful, it will make a call to close the api
     * with "refresh" as a param, so this function checks if the param is refresh
     * and reloads the table.
     *
     * Snackbar is also created on success
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result === "refresh") {
        this.snackBar.open("Category Added", "", {
          duration: 3000
        });
        this.getCategories();
      }
    });
  }

  openEditModal(element): void {
    const dialogRef = this.dialog.open(EditCategoriesModalComponent, {
      width: "50rem",
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "refresh") {
        this.snackBar.open("Category Updated", "", {
          duration: 3000
        });
        this.getCategories();
      }
    });
  }

  openDeleteModal(element): void {
    const dialogRef = this.dialog.open(DeleteCategoriesModalComponent, {
      width: "25rem",
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "refresh") {
        this.snackBar.open("Category Deleted", "", {
          duration: 3000
        });
        this.getCategories();
      }
    });
  }
}

export interface CategoryList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: "app-add-categories-modal",
  templateUrl: "./modals/add/add-categories-modal.component.html",
  styleUrls: ["./modals/add/add-categories-modal.component.scss"]
})
export class AddCategoriesModalComponent {
  AddFormGroup = new FormGroup({
    name: new FormControl("")
  });

  constructor(
    public dialogRef: MatDialogRef<AddCategoriesModalComponent>,
    private categoriesService: CategoriesService
  ) {}

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  addCategories() {
    /* Onsubmit of add modal form */
    const categoryName = this.AddFormGroup.value.name;
    const payload = {
      name: categoryName
    };
    this.categoriesService.addCategory(payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
      * which allows us to refresh the table
      */
      this.dialogRef.close("refresh");
    });
  }
}

@Component({
  selector: "app-edit-categories-modal",
  templateUrl: "./modals/edit/edit-categories-modal.component.html",
  styleUrls: ["./modals/edit/edit-categories-modal.component.scss"]
})
export class EditCategoriesModalComponent {
  EditFormGroup = new FormGroup({
    name: new FormControl(this.data.name)
  });

  constructor(
    public dialogRef: MatDialogRef<EditCategoriesModalComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: CategoryList
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editCategories() {
    const categoryName = this.EditFormGroup.value.name;
    const id = this.data.id;
    const payload = {
      name: categoryName
    };
    this.categoriesService
      .editCategory(id, payload)
      .subscribe((result: any) => {
        this.dialogRef.close("refresh");
      });
  }
}

@Component({
  selector: "app-delete-categories-modal",
  templateUrl: "./modals/delete/delete-categories-modal.component.html",
  styleUrls: ["./modals/delete/delete-categories-modal.component.scss"]
})
export class DeleteCategoriesModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoriesModalComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: CategoryList
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCategories() {
    const id = this.data.id;
    this.categoriesService.deleteCategory(id).subscribe((result: any) => {
      this.dialogRef.close("refresh");
    });
  }
}
