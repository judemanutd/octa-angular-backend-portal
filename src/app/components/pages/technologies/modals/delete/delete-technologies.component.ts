import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TechnologiesService } from '~app/services/technologies.service';
import { Technology } from '~app/interfaces/Technology';

@Component({
  selector: 'app-delete-technologies',
  templateUrl: './delete-technologies.component.html',
  styleUrls: ['./delete-technologies.component.scss'],
})
export class DeleteTechnologiesModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTechnologiesModalComponent>,
    private technologiesService: TechnologiesService,
    @Inject(MAT_DIALOG_DATA) public data: Technology,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTechnology() {
    const id = this.data.id;
    this.technologiesService.deleteTechnology(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }
}
