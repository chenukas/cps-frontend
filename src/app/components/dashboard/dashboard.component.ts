import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public displayName: string;
  public displayEmail: string;
  public displayAddress: string;
  public displayTelephone: string;
  public displayUserType: string;
  userDetails;
  constructor(private userService: UserService, private router: Router) {}

  //access logged in user details
  ngOnInit(): void {
    this.displayName = '';
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
        this.displayName = this.userDetails.fullName;
        this.displayEmail = this.userDetails.email;
        this.displayAddress = this.userDetails.address;
        this.displayTelephone = this.userDetails.telephone;
        this.displayUserType = this.userDetails.userType;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //logout method
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
