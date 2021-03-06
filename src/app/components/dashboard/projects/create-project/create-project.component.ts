import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/shared/sites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  public users: [];
  public siteNo: string;
  public siteName: string;
  public location: string;
  public budget: number;
  public id: string;
  public isOnUpdate: boolean;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private sitesService: SitesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.siteNo = '';
    this.siteName = '';
    this.location = '';
    this.budget = 0.0;

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.sitesService
          .viewSiteById(params.id)
          .subscribe((res: { data: any }) => {
            this.id = params.id;
            this.siteNo = res.data.siteNo;
            this.siteName = res.data.siteName;
            this.location = res.data.location;
            this.budget = res.data.budget;
            this.isOnUpdate = true;
          });
      } else this.isOnUpdate = false;
      this.generateNextSiteNo();
    });
  }

  //auto-generate next site number
  generateNextSiteNo() {
    this.sitesService.getNextSiteNo().subscribe((res: { data: any }) => {
      this.siteNo = res.data;
    });
  }

  //Adding site details
  addSite() {
    this.sitesService
      .addSite(this.siteNo, this.siteName, this.location, this.budget)
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Site details are successfully added', '', {
            duration: 2000,
          });
          this.router.navigate(['/dashboard/projects/manage']);
        },
        (err) => {
          this.snackbar.open('Unsuccessful', '', { duration: 2000 });
          console.log(err.message);
        }
      );
    this.clear();
  }

  clear() {
    this.siteNo = '';
    this.siteName = '';
    this.location = '';
    this.budget = 0.0;
  }

  //updating site details
  updateSiteDetails() {
    this.sitesService
      .updateSiteDetails(this.id, {
        siteNo: this.siteNo,
        siteName: this.siteName,
        location: this.location,
        budget: this.budget,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Site details are successfully updated', '', {
            duration: 2000,
          });
          this.router.navigate(['/dashboard/projects/manage']);
        },
        (err) => {
          this.snackbar.open('Unsuccessfull', '', { duration: 2000 });
          console.log(err.message);
        }
      );
  }
}
