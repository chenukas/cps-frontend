import { Component, OnInit } from '@angular/core';
import { RequisitionsService } from 'src/app/shared/requsition.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-view-requisition',
  templateUrl: './view-requisition.component.html',
  styleUrls: ['./view-requisition.component.css'],
})
export class ViewRequisitionComponent implements OnInit {
  displayedColumns = ['productName', 'qty', 'unitPrice', 'subTot'];
  dataSource = new MatTableDataSource();

  public requisitionID: string;
  public requestDate: string;
  public requireDate: string;
  public supplierName: string;
  public totalAmount: number;
  public approvedDate: Date;
  public comments: string;
  public status: string;
  public id: string;
  public siteManagerName: string;
  public siteName: string;
  public suppName: string;
  public budget: Number;
  public siteId: string;
  public tempBudget: Number;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private requisitionService: RequisitionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.requisitionID = '';
    this.siteManagerName = '';
    this.siteName = '';
    this.requestDate = '';
    this.requireDate = '';
    this.totalAmount = 0;
    this.approvedDate = new Date();
    this.comments = '';
    this.status = '';
    this.suppName = '';
    this.budget = 0;
    this.siteId = '';
    this.tempBudget = 0;

    this.getCurrentRequisition();
  }

  getCurrentRequisition() {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.requisitionService
          .viewRequisitionById(params.id)
          .subscribe((res: { data: any }) => {
            this.id = params.id;
            this.requisitionID = res.data.requisitionID;
            this.siteManagerName = res.data.siteManagerId.fullName;
            this.requestDate = res.data.requestDate;
            this.requireDate = res.data.requireDate;
            this.siteName = res.data.siteId.siteName;
            this.budget = res.data.siteId.budget;
            this.suppName = res.data.supplierName.supName;
            this.totalAmount = res.data.totalAmount;
            this.approvedDate = res.data.updatedAt;
            this.comments = res.data.comments;
            this.status = res.data.status;
            this.dataSource = new MatTableDataSource(res.data.items);
            this.siteId = res.data.siteId;
            //console.log(this.items);
          });
      }
    });
  }

  approveRequisition() {
    this.requisitionService
      .approveRequisitionById(this.id, {
        comments: this.comments,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Requisition is successfully approved', '', {
            duration: 2000,
          });
          this.getCurrentRequisition();
        },
        (err) => {
          this.snackbar.open('Unsuccessfull!', '', { duration: 2000 });
          console.log(err.message);
        }
      );
  }

  declineRequisition() {
    this.requisitionService
      .declineRequisitionById(this.id, {
        comments: this.comments,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Requisition is successfully declined', '', {
            duration: 2000,
          });
          this.getCurrentRequisition();
        },
        (err) => {
          this.snackbar.open('Unsuccessfull!', '', { duration: 2000 });
          console.log(err.message);
        }
      );
  }
}