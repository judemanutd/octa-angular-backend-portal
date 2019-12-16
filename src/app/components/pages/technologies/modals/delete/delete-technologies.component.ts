import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TechnologiesService } from '~app/services/technologies.service';
import { Technology } from '~app/interfaces/Technology';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-delete-technologies',
  templateUrl: './delete-technologies.component.html',
  styleUrls: ['./delete-technologies.component.scss'],
})
export class DeleteTechnologiesModalComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    public dialogRef: MatDialogRef<DeleteTechnologiesModalComponent>,
    private technologiesService: TechnologiesService,
    private progress: NgProgress,
    @Inject(MAT_DIALOG_DATA) public data: Technology,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
  }

  deleteTechnology() {
    this.progressRef.start();
    const id = this.data.id;
    this.technologiesService.deleteTechnology(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
      this.progressRef.complete();
    });
  }
}
