import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css'],
})
export class ManageProfileComponent implements OnInit {
  displayedColumns = ['name', 'email', 'action'];
  dataSource = new MatTableDataSource();

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.viewAllUsers();
  }

  viewAllUsers() {
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.dataSource = res.data;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  public delete(_id: string) {
    this.userService.deleteUserById(_id).subscribe(
      (res) => {
        this.viewAllUsers();
        //notify
        this.snackbar.open('User is removed successfully!', '', {
          duration: 2000,
        });
      },
      (err) => {
        //error msg
        this.snackbar.open(err.message, '', {
          duration: 2000,
        });
      }
    );
  }

  openDialog(_id: string) {
    const dialogRef = this.dialog.open(DialogBoxUserDel);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(_id);
      }
    });
  }

  navigateCreate() {
    this.router.navigate(['dashboard/profiles/create']);
  }
}

@Component({
  selector: 'dialogBoxUserDel',
  templateUrl: 'dialogBoxUserDel.html',
})
export class DialogBoxUserDel {
  constructor() {}

  public delete() {}
}
