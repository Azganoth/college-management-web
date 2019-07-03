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
      .subscribe((result: object) => {
        if (result) {
          if (typeof this.data.accept === 'function') {
            this.data.accept();
          } else {
            console.warn(`Value assigned for accept isn't of type function.`, this.data.accept);
          }
        } else {
          if (typeof this.data.reject === 'function') {
            this.data.reject();
          } else {
            console.warn(`Value assigned for reject isn't of type function.`, this.data.reject);
          }
        }
      });
  }

}
