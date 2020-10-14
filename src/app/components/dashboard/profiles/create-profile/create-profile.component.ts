import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;

  constructor(
    public userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.resetForm(form);
        this.snackbar.open('User is added successfully', null, {
          duration: 2000,
        });
        this.router.navigate(['dashboard/profiles/manage']);
      },
      (err) => {
        if (err.status === 422) {
          this.snackbar.open(err.error, null, { duration: 2000 });
        } else
          this.snackbar.open(
            'Something went wrong.Please contact admin.',
            null,
            { duration: 2000 }
          );
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      address: '',
      telephone: '',
      userType: '',
      email: '',
      password: '',
    };
    form.resetForm();
  }
}
