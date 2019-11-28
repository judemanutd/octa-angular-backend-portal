import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from '@angular/material';
import { Project } from '';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  displayedColumns: string[] = ['name', 'updatedAt', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<Project>([]);

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
    // this.categoriesService.getCategories().subscribe((result: any) => {
    //   this.dataSource = result.payload;
    // });
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    // const dialogRef = this.dialog.open(AddCategoriesModalComponent, {
    //   width: '50rem',
    // });
    // /* Runs when the modal ref created above closes
    //  * using this functionality to run successful API calls
    //  * If the call is successful, it will make a call to close the api
    //  * with "refresh" as a param, so this function checks if the param is refresh
    //  * and reloads the table.
    //  *
    //  * Snackbar is also created on success
    //  */
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'refresh') {
    //     this.snackBar.open('Category Added', '', {
    //       duration: 3000,
    //     });
    //     this.getCategories();
    //   }
    // });
  }

  openEditModal(element): void {
    // const dialogRef = this.dialog.open(EditCategoriesModalComponent, {
    //   width: '50rem',
    //   data: element,
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'refresh') {
    //     this.snackBar.open('Category Updated', '', {
    //       duration: 3000,
    //     });
    //     this.getCategories();
    //   }
    // });
  }

  openDeleteModal(element): void {
    //   const dialogRef = this.dialog.open(DeleteCategoriesModalComponent, {
    //     width: '25rem',
    //     data: element,
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result === 'refresh') {
    //       this.snackBar.open('Category Deleted', '', {
    //         duration: 3000,
    //       });
    //       this.getCategories();
    //     }
    //   });
  }
}
