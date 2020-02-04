import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Portfolio } from '~app/interfaces/Portfolio';
import { PortfolioService } from '~app/services/portfolio.service';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-delete-portfolio',
  templateUrl: './delete-portfolio.component.html',
  styleUrls: ['./delete-portfolio.component.scss'],
})
export class DeletePortfolioComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    public dialogRef: MatDialogRef<DeletePortfolioComponent>,
    private portfolioService: PortfolioService,
    private progress: NgProgress,
    @Inject(MAT_DIALOG_DATA) public data: Portfolio,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
  }

  deletePortfolio() {
    this.progressRef.start();
    const id = this.data.id;
    this.portfolioService.deletePortfolio(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
      this.progressRef.complete();
    });
  }
}
