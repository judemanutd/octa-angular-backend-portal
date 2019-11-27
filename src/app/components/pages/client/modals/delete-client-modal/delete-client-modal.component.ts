import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientsService } from '~app/services/clients.service';
import { Client } from '~app/interfaces/client';

@Component({
  selector: 'app-delete-client-modal',
  templateUrl: './delete-client-modal.component.html',
  styleUrls: ['./delete-client-modal.component.scss'],
})
export class DeleteClientModalComponent implements OnInit {
  ngOnInit() {}

  constructor(
    public dialogRef: MatDialogRef<DeleteClientModalComponent>,
    private clientsService: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: Client,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteClient() {
    const id = this.data.id;
    this.clientsService.deleteClient(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }
}
