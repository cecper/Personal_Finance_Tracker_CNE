import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/service/transaction/transaction.service';

@Component({
  selector: 'app-transaction-delete-confirm',
  templateUrl: './transaction-delete-confirm.component.html',
  styleUrls: ['./transaction-delete-confirm.component.css']
})
export class TransactionDeleteConfirmComponent implements OnInit{
  transactionId:string='';
  serverError: string | null = null;
  constructor(private router:Router,private route: ActivatedRoute,private service:TransactionService) { }

  ngOnInit() {
    this.transactionId = String(this.route.snapshot.paramMap.get('transactionId'));
  }

  onAccept() {

    this.service.deleteTransaction(this.transactionId).subscribe(
      () => {
        this.router.navigate(['/piggybank/overview/']);
      },
      (error) => {
        this.serverError = error;
      }
    );
  }

  onCancel() {
    this.router.navigate(['/piggybank/overview/']);
  }
}
