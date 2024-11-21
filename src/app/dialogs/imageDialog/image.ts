import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'image-dialog',
    templateUrl: './image.html',
    styleUrls: ['./image.css'],
  })

  export class ImageDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<ImageDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }
    ) {}
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  }