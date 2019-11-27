import { Component, OnInit } from '@angular/core';
import { ClientsService } from '~app/services/clients.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.scss'],
})
export class AddClientModalComponent implements OnInit {
  AddFormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AddClientModalComponent>,
    private clientsService: ClientsService,
  ) {}

  ngOnInit() {}

  addClient() {
    /* Onsubmit of add modal form */
    const clientName = this.AddFormGroup.value.name;
    const address = this.AddFormGroup.value.address;
    const payload = {
      name: clientName,
      address: address,
    };
    this.clientsService.addClient(payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
       * which allows us to refresh the table
       */
      this.dialogRef.close('refresh');
    });
  }
}
