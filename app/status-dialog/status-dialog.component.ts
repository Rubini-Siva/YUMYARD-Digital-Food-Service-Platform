import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent {
  selectedStatus: string;

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedStatus = data.currentStatus;
  }

  onSave(): void {
    this.dialogRef.close(this.selectedStatus);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
