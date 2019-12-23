import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDividerModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDividerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDividerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatAutocompleteModule,
  ],
})
export class MaterialModule {}
