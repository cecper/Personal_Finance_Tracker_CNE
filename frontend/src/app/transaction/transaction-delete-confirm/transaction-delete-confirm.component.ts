import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/service/transaction/transaction.service';
import { getUsername } from "../../../service/authorization";
import { Location } from '@angular/common'
@Component({
  selector: 'app-transaction-delete-confirm',
  templateUrl: './transaction-delete-confirm.component.html',
  styleUrls: ['./transaction-delete-confirm.component.css']
})
export class TransactionDeleteConfirmComponent implements OnInit{
  transactionId:string='';
  serverError: string | null = null;
  piggybankId: string = '';
  userId: string = '';
  constructor(private route: ActivatedRoute,private service:TransactionService,
              private location: Location) { }

  ngOnInit() {
    this.transactionId = String(this.route.snapshot.paramMap.get('transactionId'));
    this.piggybankId = String(this.route.snapshot.paramMap.get('piggybankId'));

  }

  onAccept() {
    this.userId = getUsername();
    this.service.deleteTransaction(this.transactionId,this.piggybankId,this.userId).subscribe(
      () => {
        this.location.back();
      },
      (error) => {
        this.serverError = error;
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
