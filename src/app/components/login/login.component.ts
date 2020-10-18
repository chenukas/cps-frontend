import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  model = {
    email: '',
    password: '',
  };

  //e-mail patter for validation
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) this.router.navigateByUrl('/dashboard');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res) => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
        this.snackbar.open(this.serverErrorMessages, null, { duration: 2000 });
      }
    );
  }
}
