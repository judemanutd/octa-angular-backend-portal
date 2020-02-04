import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from '~app/services/clients.service';
import {
  MatDialog,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from '@angular/material';

import { Client } from '../../../interfaces/client';
import { AddClientModalComponent } from './modals/add-client-modal/add-client-modal.component';
import { EditClientModalComponent } from './modals/edit-client-modal/edit-client-modal.component';
import { DeleteClientModalComponent } from './modals/delete-client-modal/delete-client-modal.component';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private progress: NgProgress,
    private snackBar: MatSnackBar,
  ) {}
  displayedColumns: string[] = ['name', 'address', 'updatedAt', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.getClients();
  }

  getClients() {
    this.progressRef.start();
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.clientsService.getClient().subscribe((result: any) => {
      this.dataSource = result.payload;
      this.progressRef.complete();
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(AddClientModalComponent, {
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
        this.snackBar.open('Client Added', '', {
          duration: 3000,
        });
        this.getClients();
      }
    });
  }

  openEditModal(element): void {
    const dialogRef = this.dialog.open(EditClientModalComponent, {
      width: '50rem',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Client Updated', '', {
          duration: 3000,
        });
        this.getClients();
      }
    });
  }

  openDeleteModal(element): void {
    const dialogRef = this.dialog.open(DeleteClientModalComponent, {
      width: '25rem',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Client Deleted', '', {
          duration: 3000,
        });
        this.getClients();
      }
    });
  }
}
