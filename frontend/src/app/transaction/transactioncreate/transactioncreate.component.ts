import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterServiceService} from "../../../service/register/register-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transactioncreate',
  templateUrl: './transactioncreate.component.html',
  styleUrls: ['./transactioncreate.component.css']
})
export class TransactioncreateComponent {
  serverError: string | null = null;
  submitted = false;
  public transactionForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private service: RegisterServiceService, private fb: FormBuilder, private router: Router) {
  }

  createTransaction() {

  }
}
