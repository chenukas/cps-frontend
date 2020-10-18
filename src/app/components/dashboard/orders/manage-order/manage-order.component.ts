import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { OrderService } from "src/app/shared/order.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EventEmitter } from 'protractor';
import { ViewItemsComponent } from '../view-items/view-items.component';
import { environment } from 'src/environments/environment';
// import { APIResponse } from 'src/app/models/apiresponse';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  displayedColumns: string[] = ["no", "requisition", "site", "supplier", "total", "state", "actions"];
  dataSource: MatTableDataSource<any>;
  order;
  dataIsLoaded = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private filters: {
    limit: number,
    page: number
  };
  count: number;
  isLoading: boolean;

  constructor(
    private orderService: OrderService,
    private snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.filters = { limit: 5, page: 0 };
    this.viewOrder(this.filters.page, this.filters.limit);
  }

  changePage($event) {
    this.filters = {
      page: $event.pageIndex,
      limit: $event.pageSize
    };
    this.viewOrder($event.pageIndex, $event.pageSize);
  }

  //search
  applyFilter(keyword) {
    this.dataSource.filter = keyword.trim().toLowerCase();
  }

  viewItems(order) {
    const dialogRef = this.dialog.open(ViewItemsComponent, {
      data: { order },
      width: '600px',
    });
  }

  //get all the ordersin the system
  viewOrder(page: number, limit: number) {
    this.isLoading = true;
    this.orderService.viewOrder().subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataSource = new MatTableDataSource(res.data);
        this.count = res.count;
        this.dataIsLoaded = true;
        this.order = res.data;
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;

      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  //alert
  openDialog(_id: string, orderID: string) {
    const dialogRef = this.dialog.open(DialogBox, {
      data: { _id, orderID },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.changeState(_id);
      }
    });
  }

  //change state to delivered
  public changeState(_id: string) {
    this.orderService.changeOrderState(_id).subscribe(
      (res) => {
        this.viewOrder(this.filters.page, this.filters.limit);
        //notify
        this.snackbar.open("Changed to delivered!", "", { duration: 2000 });
      },
      (err) => {
        //error msg
        this.snackbar.open(err.message, "", {
          duration: 2000,
        });
      }
    );
  }

}

//dialog box
@Component({
  selector: "dialogBox",
  templateUrl: "dialogBox.html",
})
export class DialogBox {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { _id: string; orderID: string; }
  ) { }

  public changeState() { }
}
