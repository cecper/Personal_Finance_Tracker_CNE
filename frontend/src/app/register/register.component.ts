import { Component } from '@angular/core';
import { RegisterServiceService } from '../../service/register/register-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import {RegistrationData} from "../../types/types";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  serverError: string | null = null;
  submitted = false;
  public registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });



  constructor(private service: RegisterServiceService, private fb: FormBuilder,private router: Router, private authservice: LoginService) {}

  register() {
    this.serverError = null;
    this.submitted = true;
    if (this.registerForm.valid) {
      const formData: RegistrationData = {
        username: this.registerForm.get('username')?.value || '',
        email: this.registerForm.get('email')?.value || '',
        password: this.registerForm.get('password')?.value || '',
      };



      this.service.registerUser(formData).subscribe(
        (response) => {
          // Login user with the auth service
          this.authservice.login(formData).subscribe(
            () => {
              this.router.navigateByUrl('/');
            },
            (loginError) => {
              this.serverError = 'Failed to login. Please try again later.';
            }
          );

        },
        (registrationError) => {
          if (registrationError.status === 400) {
            this.serverError = 'Username or Email already exists';
          } else {
            this.serverError = 'Failed to register. Please try again later.';
          }
        }
      );
    }
  }
}






