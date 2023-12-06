import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "../../../service/transaction/transaction.service";
import {CreateTransactionData} from "../../../types/types";
import { Location } from '@angular/common'

@Component({
  selector: 'app-transactioncreate',
  templateUrl: './transactioncreate.component.html',
  styleUrls: ['./transactioncreate.component.css']
})
export class TransactioncreateComponent implements OnInit {
  serverError: string | null = null;
  piggybankId: string ='';
  submitted = false;
  public transactionForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', ],
    amount: ['', [Validators.required, Validators.pattern("^-?[0-9]*$")]],
    sender: ['', [Validators.required, Validators.minLength(2)]],
    receiver: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(private service: TransactionService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {}
  ngOnInit() {
    this.piggybankId = String(this.route.snapshot.paramMap.get('piggybankId'));
  }

  createTransaction() {
    this.submitted = true;
    if (this.transactionForm.valid) {
      const transactionData: CreateTransactionData = { // Create the data object
        piggyBankId: this.piggybankId,
        name: this.transactionForm.get('name')?.value as string,
        description: this.transactionForm.get('description')?.value as string,
        amount: this.transactionForm.get('amount')?.getRawValue(),
        sender: this.transactionForm.get('sender')?.value as string,
        receiver: this.transactionForm.get('receiver')?.value as string,
        userName: localStorage.getItem('username') as string
      };

      this.service.createTransaction(transactionData).subscribe(
        () => {
          this.router.navigate(['/transaction/all/',this.piggybankId]);
        },
        (error) => {
          this.serverError = error;
        }
      );
    }
  }
}
