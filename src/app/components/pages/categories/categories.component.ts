import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Category } from '../../../interfaces/Category';
import { CategoriesService } from '../../../services/categories.service';

import { AddCategoriesModalComponent } from './modals/add/add-categories-modal.componenet';
import { EditCategoriesModalComponent } from './modals/edit/edit-categories-modal.component';
import { DeleteCategoriesModalComponent } from './modals/delete/delete-categories-modal.component';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    private categoriesService: CategoriesService,
    private progress: NgProgress,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  displayedColumns: string[] = ['name', 'updatedAt', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<Category>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    // Call to fetch all Categories on page load
    this.getCategories();
  }

  getCategories() {
    this.progressRef.start();
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.dataSource = result.payload;
      this.progressRef.complete();
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(AddCategoriesModalComponent, {
      width: '50rem',
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
      if (result === 'refresh') {
        this.snackBar.open('Category Added', '', {
          duration: 3000,
        });
        this.getCategories();
      }
    });
  }

  openEditModal(element): void {
    const dialogRef = this.dialog.open(EditCategoriesModalComponent, {
      width: '50rem',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Category Updated', '', {
          duration: 3000,
        });
        this.getCategories();
      }
    });
  }

  openDeleteModal(element): void {
    const dialogRef = this.dialog.open(DeleteCategoriesModalComponent, {
      width: '25rem',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Category Deleted', '', {
          duration: 3000,
        });
        this.getCategories();
      }
    });
  }
}
