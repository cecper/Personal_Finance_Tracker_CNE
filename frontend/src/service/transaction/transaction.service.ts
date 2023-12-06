import { Injectable } from '@angular/core';
import { CreateTransactionData} from "../../types/types";
import {Observable} from "rxjs";
import * as auth from "../authorization";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  //private baseUrl = 'https://functies.azurewebsites.net/api';
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createTransaction(data: CreateTransactionData): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/createTransactionHttpTrigger`, data, { headers });
  }

  getAllTransactions(piggybankId:string): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/getAllTransactionsByPiggybankIdHttpTrigger`,{"piggybankId":piggybankId}, { headers });
  }

  deleteTransaction(id: string): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/deleteTransactionByIdHttpTrigger`,{"transactionId":id}, { headers });
  }
}
