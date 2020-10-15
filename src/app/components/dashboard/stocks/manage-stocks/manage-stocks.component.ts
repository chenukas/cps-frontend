import { Component, OnInit, ViewChild } from '@angular/core';
import { StocksService } from 'src/app/shared/stocks.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css'],
})
export class ManageStocksComponent implements OnInit {
  displayedColumns = [
    'itemName',
    'description',
    'supplier',
    'quantity',
    'unitPrice',
    'action',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public itemName: string;
  public description: string;
  public supplier: string;
  public quantity: Number;
  public unitPrice: Number;
  public _id: string;
  public items: [];

  constructor(
    private stocksService: StocksService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewAllItems();
  }

  viewAllItems() {
    this.stocksService.viewItems().subscribe((res: APIResponse) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  addItem() {
    this.router.navigate(['dashboard/items/add']);
  }

  openDialog(_id: string) {
    const dialogRef = this.dialog.open(DialogBoxStockDel);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(_id);
      }
    });
  }

  public deleteItem(_id: String) {
    this.stocksService.deleteItemById(_id).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Item is successfully deleted', null, {
          duration: 2000,
        });
        this.viewAllItems();
      },
      (err) => {
        //error msg
        this.snackBar.open(err.message, '', {
          duration: 2000,
        });
      }
    );
  }

  updateItem(id: String) {
    this.router.navigate(['dashboard/items/add'], {
      queryParams: { id },
    });
  }
}

@Component({
  selector: 'dialogBoxStockDel',
  templateUrl: 'dialogBoxStockDel.html',
})
export class DialogBoxStockDel {
  constructor() {}

  public deleteItem() {}
}
