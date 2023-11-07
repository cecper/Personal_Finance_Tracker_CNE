import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/service/transaction/transaction.service';

@Component({
  selector: 'app-transaction-overview-by-piggybank',
  templateUrl: './transaction-overview-by-piggybank.component.html',
  styleUrls: ['./transaction-overview-by-piggybank.component.css']
})

export class TransactionOverviewByPiggybankComponent implements OnInit {
  serverError: string | null = null;
  piggybankId: string ='';
  transactions: any[] = [];
  constructor(private service: TransactionService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.piggybankId = String(this.route.snapshot.paramMap.get('piggybankId'));
    this.loadTransactions();
  }

  loadTransactions() {
    this.service.getAllTransactions(this.piggybankId).subscribe(
        (data: any) => {
            console.log(data);
            this.transactions = data;
        },
        (error: any) => {
            this.serverError = "Something went wrong. Please try again later.";
        }
    );
}
  
}
