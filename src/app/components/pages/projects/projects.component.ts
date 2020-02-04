import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from '@angular/material';
import { ProjectsService } from '~app/services/projects.service';
import { Project } from '~app/interfaces/Project';
import { AddProjectModalComponent } from './modals/add-project-modal/add-project-modal.component';
import { DeleteProjectModalComponent } from './modals/delete-project-modal/delete-project-modal.component';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectsService],
})
export class ProjectsComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    private projectsService: ProjectsService,
    public dialog: MatDialog,
    private progress: NgProgress,
    private snackBar: MatSnackBar,
  ) {}

  displayedColumns: string[] = ['name', 'updatedAt', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<Project>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    // Call to fetch all Categories on page load
    this.getProjects();
  }

  getProjects() {
    this.progressRef.start();
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.projectsService.getProjects().subscribe((result: any) => {
      this.dataSource = result.payload;
      this.progressRef.complete();
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(AddProjectModalComponent, {
      width: '50rem',
    });
    // /* Runs when the modal ref created above closes
    //  * using this functionality to run successful API calls
    //  * If the call is successful, it will make a call to close the api
    //  * with "refresh" as a param, so this function checks if the param is refresh
    //  * and reloads the table.
    //  *
    //  * Snackbar is also created on success
    //  */
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Project Added', '', {
          duration: 3000,
        });
        this.getProjects();
      }
    });
  }

  openDeleteModal(element): void {
    const dialogRef = this.dialog.open(DeleteProjectModalComponent, {
      width: '25rem',
      data: element,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Project Deleted', '', {
          duration: 3000,
        });
        this.getProjects();
      }
    });
  }
}
