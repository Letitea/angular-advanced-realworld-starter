import { UserLoginInfo } from './../../interfaces/login-info';
import { LoginService } from './../../login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserLoginInfo = {
    email: '',
    password: '',
  };
  redirectUrl = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.redirectUrl = param.get('redirect') || '';
    });
  }
  login() {
    this.loginService
      .login(this.user)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          alert(err.message);
          throw err;
        })
      )
      .subscribe({
        next: (result) => {
          localStorage.setItem('token', result.user.token);
          this.router.navigateByUrl(this.redirectUrl ?? '/');
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.body);
        },
        complete: () => {},
      });
  }
}
