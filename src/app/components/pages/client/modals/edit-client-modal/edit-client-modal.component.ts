import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '~app/interfaces/client';
import { ClientsService } from '~app/services/clients.service';

@Component({
  selector: 'app-edit-client-modal',
  templateUrl: './edit-client-modal.component.html',
  styleUrls: ['./edit-client-modal.component.scss'],
})
export class EditClientModalComponent implements OnInit {
  EditFormGroup = new FormGroup({
    name: new FormControl(this.data.name),
    address: new FormControl(this.data.address),
  });

  constructor(
    public dialogRef: MatDialogRef<EditClientModalComponent>,
    private clientsService: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: Client,
  ) {}
  ngOnInit() {
    console.log('TCL: EditClientModalComponent -> data', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editClients() {
    const clientName = this.EditFormGroup.value.name;
    const address = this.EditFormGroup.value.address;
    const id = this.data.id;

    const payload = {
      name: clientName,
      address: address,
    };
    this.clientsService.editClient(id, payload).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }
}
