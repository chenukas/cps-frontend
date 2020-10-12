import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SitesService } from 'src/app/shared/sites.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

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
  displayedColumns = ['siteNo', 'siteName', 'action'];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public siteNo: string;
  public siteName: string;
  public location: string;
  public budget: number;
  public _id: string;
  public sites: [];

  constructor(
    private siteService: SitesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    //this._id = '';
    //this.siteNo ='';
    //this.siteName = '';
    this.viewAllSites();
  }

  viewAllSites() {
    this.siteService.viewSites().subscribe(
      (res: APIResponse) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
      });
  }
 
  addSite() {
    this.router.navigate(['dashboard/projects/create']);
  }

  deleteSiteDetails(id: String) {
    this.siteService.deleteSiteById(id).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Site Details Are Successfully Deleted', null, {
          duration: 2000,
        });
        this.viewAllSites();
      },
      (err) => {
        this.snackBar.open('Unsuccessful', null, { duration: 3000 });
        console.log(err.message);
      }
    );
  }

  updateSiteDetails(id : String) {
    this.router.navigate(['dashboard/projects/create'], { queryParams: { id } });
  }
}

