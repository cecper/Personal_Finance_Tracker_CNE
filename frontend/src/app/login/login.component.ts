import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";
import {LoginData} from "../../types/types";
import * as auth from "../../service/authorization";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loggedIn:boolean = auth.isLoggedIn();
  form:FormGroup;
  serverError: string | null = null;
  submitted = false;
  constructor(private fb:FormBuilder,
              private authService: LoginService,
              private router: Router) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    this.submitted = true;
    const val = this.form.value;
    this.serverError = null; // Reset serverError
    const loginData: LoginData = {
      username: val.username,
      password: val.password
    }

    if (loginData.username && loginData.password) {
      console.log("LoginComponent: login: loginData: ", loginData);
      this.authService.login(loginData)
        .subscribe(
          () => {
            this.router.navigateByUrl('/home');
          },
          (error: any) => {
            if (error.status === 401) {
              this.serverError = 'Invalid username or password';
            } else {
              this.serverError = 'Failed to login. Please try again later.';
            }
          }
        );
    }
  }
}
