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
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.dataSource = result.payload;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddCategoriesModalComponent, {
      width: "50rem"
    });

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
    this.dialogRef.close();
  }

  addCategories() {
    const categoryName = this.AddFormGroup.value.name;
    const payload = {
      name: categoryName
    };
    this.categoriesService.addCategory(payload).subscribe((result: any) => {
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
