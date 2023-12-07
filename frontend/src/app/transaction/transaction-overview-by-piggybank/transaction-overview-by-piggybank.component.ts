import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/service/transaction/transaction.service';
import { PiggybankService } from 'src/service/piggybank/piggybank.service';
import { getUsername } from "../../../service/authorization";
@Component({
  selector: 'app-transaction-overview-by-piggybank',
  templateUrl: './transaction-overview-by-piggybank.component.html',
  styleUrls: ['./transaction-overview-by-piggybank.component.css']
})

export class TransactionOverviewByPiggybankComponent implements OnInit {
  serverError: string | null = null;
  piggybankId: string ='';
  transactions: any[] = [];
  piggybank: any = null;
  username: string = '';
  constructor(private service: TransactionService, private route: ActivatedRoute, private piggybankService: PiggybankService) {

  }

  ngOnInit() {
    this.piggybankId = String(this.route.snapshot.paramMap.get('piggybankId'));
    this.username = getUsername();
    this.loadTransactions();
    this.loadPiggybank();
  }

    loadPiggybank() {

        this.piggybankService.getPiggybankById(this.piggybankId,this.username).subscribe(
            (data: any) => {

                this.piggybank = data;
            },
            (error: any) => {
                this.serverError = "Something went wrong. Please try again later.";
            }
        );
    }

  loadTransactions() {
    this.service.getAllTransactions(this.piggybankId).subscribe(
        (data: any) => {
            this.transactions = data;
        },
        (error: any) => {
            this.serverError = "Something went wrong. Please try again later.";
        }
    );
}

}
