import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PiggybankService } from "../../../service/piggybank/piggybank.service";
import { CreatePiggybankData } from "../../../types/types";
import { LoginService } from "../../../service/login/login.service";
import {getUsername} from "../../../service/authorization";

@Component({
  selector: 'app-piggybankcreate',
  templateUrl: './piggybankcreate.component.html',
  styleUrls: ['./piggybankcreate.component.css']
})
export class PiggybankcreateComponent {
  submitted = false;
  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    balance: ['', [Validators.required]], // Assuming balance is a number
  });

  constructor(private loginservice: LoginService, private service: PiggybankService, private fb: FormBuilder) {}

  create() {
    this.submitted = true;
    if (this.registerForm.valid) {

      const formData: CreatePiggybankData = {
        name: this.registerForm.get('name')?.value || '',
        balance: this.registerForm.get('balance')?.getRawValue() || 0, // Assuming balance is a number
        username: getUsername(),
      };

      if (formData.username === '') {
        console.error('User ID is empty, cannot create piggybank');
        return;
      }

      this.service.createPiggybank(formData).subscribe(
        (response: any) => {
          console.log('Piggybank creation successful:', response);
          // Handle success as needed
        },
        (error: any) => {
          console.error('Error creating piggybank:', error);
          // Handle error as needed
        }
      );
    }
  }
}
