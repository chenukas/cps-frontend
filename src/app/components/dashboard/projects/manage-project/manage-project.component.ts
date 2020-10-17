import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SitesService } from 'src/app/shared/sites.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css'],
})
export class ManageProjectComponent implements OnInit {
  displayedColumns = ['siteNo', 'siteName', 'location', 'budget', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public siteNo: string;
  public siteName: string;
  public location: string;
  public budget: number;
  public _id: string;
  public sites: [];
  public siteNames: any;
  public budgets: [];

  constructor(
    private siteService: SitesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewAllSites();
  }

  viewAllSites() {
    this.siteService.viewSites().subscribe((res: APIResponse) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  addSite() {
    this.router.navigate(['dashboard/projects/create']);
  }

  openDialog(_id: string) {
    const dialogRef = this.dialog.open(DialogBoxSiteDel);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSiteDetails(_id);
      }
    });
  }

  public deleteSiteDetails(_id: String) {
    this.siteService.deleteSiteById(_id).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Site details are successfully deleted', null, {
          duration: 2000,
        });
        this.viewAllSites();
      },
      (err) => {
        //error msg
        this.snackBar.open(err.message, '', {
          duration: 2000,
        });
      }
    );
  }

  updateSiteDetails(id: String) {
    this.router.navigate(['dashboard/projects/create'], {
      queryParams: { id },
    });
  }
}

@Component({
  selector: 'dialogBoxSiteDel',
  templateUrl: 'dialogBoxSiteDel.html',
})
export class DialogBoxSiteDel {
  constructor() {}

  public deleteSiteDetails() {}
}
