import { Component, OnInit } from '@angular/core';
import { RequisitionsService } from 'src/app/shared/requsition.service';
import { SitesService } from 'src/app/shared/sites.service';
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
  public totalAmount: any;
  public approvedDate: Date;
  public comments: string;
  public status: string;
  public id: string;
  public siteManagerName: string;
  public siteName: string;
  public suppName: string;
  public budget: any;
  public siteId: string;
  public remainingBudget: any;
  public site_id: string;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private requisitionService: RequisitionsService,
    private route: ActivatedRoute,
    private sitesService: SitesService
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
    this.remainingBudget = 0;
    this.site_id = '';

    this.getCurrentRequisition();
  }

  //Function to get all requisitions
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
            this.site_id = res.data.siteId._id;
            //console.log(this.items);
          });
      }
    });
  }

  //Function to approve requisitions
  approveRequisition() {
    this.requisitionService
      .approveRequisitionById(this.id, {
        comments: this.comments,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Requisition is successfully approved', '', {
            duration: 1000,
          });
          this.updateSiteBudget();
        },
        (err) => {
          this.snackbar.open('Unsuccessfull!', '', { duration: 2000 });
          console.log(err.message);
        }
      );
  }

  //Function to decline requisition
  declineRequisition() {
    this.requisitionService
      .declineRequisitionById(this.id, {
        comments: this.comments,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Requisition is successfully declined', '', {
            duration: 1000,
          });
          this.getCurrentRequisition();
        },
        (err) => {
          this.snackbar.open('Unsuccessfull!', '', { duration: 2000 });
          console.log(err.message);
        }
      );
  }

  //Function to update site budget
  updateSiteBudget() {
    this.remainingBudget = this.budget - this.totalAmount;
    console.log(this.remainingBudget);
    this.sitesService
      .updateBudget(this.site_id, {
        remainingBudget: this.remainingBudget,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.getCurrentRequisition();
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
