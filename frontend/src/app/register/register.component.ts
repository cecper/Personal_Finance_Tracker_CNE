import { Component } from '@angular/core';
import { RegisterServiceService } from '../../service/register/register-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import {RegistrationData} from "../../types/types";
import {Router} from "@angular/router";


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



  constructor(private service: RegisterServiceService, private fb: FormBuilder,private router: Router) {}

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
          this.router.navigateByUrl('/home');
        },
        (error) => {
          this.serverError = "Failed to register your account. Please try again later.";
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }


}
