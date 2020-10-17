import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/shared/supplier.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css'],
})
export class CreateSupplierComponent implements OnInit {
  public supId: string;
  public supName: string;
  public supLocation: string;
  public supEmail: string;
  public supTel: string;
  public id: string;
  public isOnUpdate: boolean;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private supplierService: SupplierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.supId = '';
    this.supName = '';
    this.supLocation = '';
    this.supEmail = '';
    this.supTel = '';

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.supplierService
          .viewSupplierById(params.id)
          .subscribe((res: { data: any }) => {
            this.id = params.id;
            this.supId = res.data.supId;
            this.supName = res.data.supName;
            this.supLocation = res.data.supLocation;
            this.supEmail = res.data.supEmail;
            this.supTel = res.data.supTel;
            this.isOnUpdate = true;
          });
      } else {
        this.isOnUpdate = false;
        this.generateNextSupNo();
      }
    });
  }

  generateNextSupNo() {
    this.supplierService.getNextSupNo().subscribe((res: { data: any }) => {
      this.supId = res.data;
    });
  }

  addSupplier() {
    this.supplierService
      .addSupplier(
        this.supId,
        this.supName,
        this.supLocation,
        this.supEmail,
        this.supTel
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Supplier details are successfully added', '', {
            duration: 2000,
          });
          this.router.navigate(['/dashboard/suppliers/manage']);
        },
        (err) => {
          this.snackbar.open('Unsuccessful', '', { duration: 2000 });
          console.log(err.message);
        }
      );
    this.clear();
  }

  clear() {
    this.supId = '';
    this.supName = '';
    this.supLocation = '';
    this.supEmail = '';
    this.supTel = '';
  }

  updateSupplierDetails() {
    this.supplierService
      .updateSupplierDetails(this.id, {
        supId: this.supId,
        supName: this.supName,
        supLocation: this.supLocation,
        supEmail: this.supEmail,
        supTel: this.supTel,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Supplier details are successfully updated', '', {
            duration: 2000,
          });
          this.router.navigate(['/dashboard/suppliers/manage']);
        },
        (err) => {
          this.snackbar.open('Unsuccessfull', '', { duration: 2000 });
          console.log(err.message);
        }
      );
  }
}
