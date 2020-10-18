import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ViewItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {order: any}
  ) { }

  ngOnInit(): void {
  }

}
