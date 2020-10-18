import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { OrderService } from "src/app/shared/order.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EventEmitter } from 'protractor';
import { environment } from 'src/environments/environment';
// import { APIResponse } from 'src/app/models/apiresponse';;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ["no", "requisition", "site", "supplier", "total", "actions"];
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
    this.viewDeliveredOrders(this.filters.page, this.filters.limit);
  }

  openInvoice(id) {
    window.open(environment.apiHost + '/orders/' + id + '/invoice', '_blank');
  }

  changePage($event) {
    this.filters = {
      page: $event.pageIndex,
      limit: $event.pageSize
    };
    this.viewDeliveredOrders($event.pageIndex, $event.pageSize);
  }

  viewDeliveredOrders(page: number, limit: number) {
    this.isLoading = true;
    this.orderService.viewDeliveredOrders().subscribe(
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
}
