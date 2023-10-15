import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";
import {LoginData} from "../../types/types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: LoginService,
              private router: Router) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const val = this.form.value;
    const loginData: LoginData = {
      username: val.username,
      password: val.password
    }

    if (loginData.username && loginData.password) {
      console.log("LoginComponent: login: loginData: ", loginData);
      this.authService.login(loginData)
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
          }
        );
    }
  }
}
