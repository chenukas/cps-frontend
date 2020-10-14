import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from 'src/app/shared/supplier.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.css'],
})
export class ManageSupplierComponent implements OnInit {
  displayedColumns = [
    'supId',
    'supName',
    'supLocation',
    'supEmail',
    'supTel',
    'action',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public supId: string;
  public supName: string;
  public supLocation: string;
  public supEmail: string;
  public supTel: string;
  public _id: string;
  public suppliers: [];

  constructor(
    private supplierService: SupplierService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewAllSuppliers();
  }

  viewAllSuppliers() {
    this.supplierService.viewSuppliers().subscribe((res: APIResponse) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  addSupplier() {
    this.router.navigate(['dashboard/suppliers/create']);
  }

  openDialog(_id: string) {
    const dialogRef = this.dialog.open(DialogBoxSupDel);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSupDetails(_id);
      }
    });
  }

  public deleteSupDetails(_id: String) {
    this.supplierService.deleteSupplierById(_id).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Supplier is successfully deleted', null, {
          duration: 2000,
        });
        this.viewAllSuppliers();
      },
      (err) => {
        //error msg
        this.snackBar.open(err.message, '', {
          duration: 2000,
        });
      }
    );
  }

  updateSupDetails(id: String) {
    this.router.navigate(['dashboard/suppliers/create'], {
      queryParams: { id },
    });
  }
}

@Component({
  selector: 'dialogBoxSupDel',
  templateUrl: 'dialogBoxSupDel.html',
})
export class DialogBoxSupDel {
  constructor() {}

  public deleteSupDetails() {}
}
