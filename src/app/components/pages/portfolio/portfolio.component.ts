import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatSnackBar,
  MatDialog,
} from '@angular/material';
import { PortfolioService } from '~app/services/portfolio.service';
import { Portfolio } from '~app/interfaces/Portfolio';
import { AddPortfolioComponent } from './add-portfolio/add-portfolio.component';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';
import { DeletePortfolioComponent } from './delete-portfolio/delete-portfolio.component';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    private portfolioService: PortfolioService,
    private progress: NgProgress,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  displayedColumns: string[] = ['name', 'updatedAt', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<Portfolio>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    // Call to fetch all Categories on page load
    this.getPortfolios();
  }

  getPortfolios() {
    this.progressRef.start();
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.portfolioService.getPortfolios().subscribe((result: any) => {
      this.dataSource = result.payload;
      this.progressRef.complete();
      console.log('TCL: PortfolioComponent -> getPortfolios -> result.payload', result.payload);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(AddPortfolioComponent, {
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
        this.getPortfolios();
      }
    });
  }

  openEditModal(element): void {
    console.log(element);
    const dialogRef = this.dialog.open(EditPortfolioComponent, {
      width: '50rem',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Portfolio Updated', '', {
          duration: 3000,
        });
        this.getPortfolios();
      }
    });
  }

  openDeleteModal(element): void {
    const dialogRef = this.dialog.open(DeletePortfolioComponent, {
      width: '25rem',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Portfolio Deleted', '', {
          duration: 3000,
        });
        this.getPortfolios();
      }
    });
  }
}
