import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RequisitionsService } from 'src/app/shared/requsition.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-manage-requisition',
  templateUrl: './manage-requisition.component.html',
  styleUrls: ['./manage-requisition.component.css'],
})
export class ManageRequisitionComponent implements OnInit {
  displayedColumns = [
    'requisitionID',
    'siteId',
    'requestDate',
    'totalAmount',
    'status',
    'approvedDate',
    'action',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public requisitions: [];
  public requisitionID: string;

  public siteManagerId: string;
  public requestDate: string;
  public requireDate: string;
  public siteId: string;
  public supplierName: string;
  public items: [];
  public totalAmount: number;
  public totalBudget: number;
  public approvedDate: Date;
  public comments: string;
  public status: string;
  public _id: string;

  constructor(
    private router: Router,
    private requisitionService: RequisitionsService
  ) {}

  ngOnInit(): void {
    this.viewAllRequisitions();
  }

  viewAllRequisitions() {
    this.requisitionService.viewRequisitions().subscribe((res: APIResponse) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  viewRequisitionById(id: string) {
    this.router.navigate(['dashboard/requisitions/view'], {
      queryParams: { id },
    });
  }
}
