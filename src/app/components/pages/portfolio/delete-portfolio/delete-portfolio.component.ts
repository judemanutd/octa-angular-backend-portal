import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Portfolio } from '~app/interfaces/Portfolio';
import { PortfolioService } from '~app/services/portfolio.service';

@Component({
  selector: 'app-delete-portfolio',
  templateUrl: './delete-portfolio.component.html',
  styleUrls: ['./delete-portfolio.component.scss'],
})
export class DeletePortfolioComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePortfolioComponent>,
    private portfolioService: PortfolioService,
    @Inject(MAT_DIALOG_DATA) public data: Portfolio,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deletePortfolio() {
    const id = this.data.id;
    this.portfolioService.deletePortfolio(id).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }
}
