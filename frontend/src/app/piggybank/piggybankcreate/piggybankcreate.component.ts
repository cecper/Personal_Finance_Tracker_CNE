import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PiggybankService } from "../../../service/piggybank/piggybank.service";
import { CreatePiggybankData } from "../../../types/types";
import { LoginService } from "../../../service/login/login.service";
import { getUsername } from "../../../service/authorization";
import { Router } from '@angular/router'; // Import Router

// ... (your imports)

@Component({
  selector: 'app-piggybankcreate',
  templateUrl: './piggybankcreate.component.html',
  styleUrls: ['./piggybankcreate.component.css']
})
export class PiggybankcreateComponent {
  submitted = false;
  serverError: string | null = null;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    balance: ['', [Validators.required, Validators.pattern("^[-]?[0-9]*$") ]],
  });

  constructor(
    private service: PiggybankService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  create() {
    this.submitted = true;
    this.serverError = null; // Reset serverError

    if (this.registerForm.valid) {
      const formData: CreatePiggybankData = {
        name: this.registerForm.get('name')?.value || '',
        balance: this.registerForm.get('balance')?.getRawValue() || 0,
        username: getUsername(),
      };

      if (formData.username === '') {
        this.serverError = 'Failed to create piggybank. Please make sure you are logged.';
        return;
      }

      this.service.createPiggybank(formData).subscribe(
        (response: any) => {
          // Redirect to the desired page upon successful response
          this.router.navigate(['/piggybank/overview']);

        },
        (error: any) => {
          if (error.status === 400) {
            this.serverError = 'Piggybank already exists';
          } else {
            this.serverError = 'Failed to create piggybank. Please try again later.';
          }
        }
      );
    }
  }
}
