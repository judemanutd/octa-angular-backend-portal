import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProjectsService } from '~app/services/projects.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientsService } from '~app/services/clients.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent {
  AddFormGroup = new FormGroup({
    name: new FormControl(''),
    client: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    cost: new FormControl(''),
    currency: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AddProjectModalComponent>,
    private projectsService: ProjectsService,
    private clientsService: ClientsService,
  ) {}
  public clients: [];

  ngOnInit() {
    this.getclients();
  }

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  addProjects() {
    /* Onsubmit of add modal form */
    const projectName = this.AddFormGroup.value.name;
    const clientId = this.AddFormGroup.value.client;
    const startDate = this.AddFormGroup.value.start;
    const endDate = this.AddFormGroup.value.end;
    const cost = this.AddFormGroup.value.cost;
    const currency = this.AddFormGroup.value.currency;
    const payload = {
      name: projectName,
      clientId: clientId,
      startDate: startDate,
      endDate: endDate,
      cost: cost,
      currency: currency,
    };
    this.projectsService.addProject(payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
       * which allows us to refresh the table
       */
      this.dialogRef.close('refresh');
    });
  }

  getclients() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.clientsService.getClient().subscribe((result: any) => {
      this.clients = result.payload;
    });
  }
}
