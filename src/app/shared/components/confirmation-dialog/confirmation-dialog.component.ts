import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      message: string,
      accept: () => any,
      reject: () => any
    }
  ) { }

  ngOnInit() {
    this.dialogRef.afterClosed()
      .subscribe(result => result ? this.data.accept() : this.data.reject());
  }

}
