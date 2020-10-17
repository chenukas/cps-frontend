import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/shared/supplier.service';
import { StocksService } from 'src/app/shared/stocks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-add-stocks',
  templateUrl: './add-stocks.component.html',
  styleUrls: ['./add-stocks.component.css'],
})
export class AddStocksComponent implements OnInit {
  public itemName: string;
  public description: string;
  public supplier: string;
  public quantity: Number;
  public unitPrice: Number;
  public id: string;
  public isOnUpdate: boolean;
  public supps: [];

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private supplierService: SupplierService,
    private stocksService: StocksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemName = '';
    this.description = '';
    this.supplier = '';
    this.quantity = 0;
    this.unitPrice = 0.0;

    this.loadSuppliersList();

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.stocksService
          .viewItemById(params.id)
          .subscribe((res: { data: any }) => {
            this.id = params.id;
            this.itemName = res.data.itemName;
            this.description = res.data.description;
            this.supplier = res.data.supplier;
            console.log(this.supplier);
            this.quantity = res.data.quantity;
            this.unitPrice = res.data.unitPrice;
            this.isOnUpdate = true;
          });
      }
    });
  }

  loadSuppliersList() {
    this.supplierService.viewSuppliers().subscribe((res: { data: any }) => {
      this.supps = res.data;
      console.log(this.supps);
    });
  }

  addItem() {
    this.stocksService
      .addItem(
        this.itemName,
        this.description,
        this.supplier,
        this.quantity,
        this.unitPrice
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Item details are successfully added', '', {
            duration: 2000,
          });
          this.router.navigate(['/dashboard/items/manage']);
        },
        (err) => {
          this.snackbar.open('Unsuccessful', '', { duration: 2000 });
          console.log(err.message);
        }
      );
    console.log(this.supplier);
    this.clear();
  }

  clear() {
    this.itemName = '';
    this.description = '';
    this.supplier = '';
    this.quantity = 0;
    this.unitPrice = 0.0;
  }

  updateItem() {
    this.stocksService
      .updateItemById(this.id, {
        itemName: this.itemName,
        description: this.description,
        quantity: this.quantity,
        unitPrice: this.unitPrice,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Stock details are successfully updated', '', {
            duration: 2000,
          });
          this.router.navigate(['/dashboard/items/manage']);
        },
        (err) => {
          this.snackbar.open('Unsuccessfull', '', { duration: 2000 });
          console.log(err.message);
        }
      );
    console.log(this.supplier);
  }
}
