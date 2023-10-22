import { Injectable } from '@angular/core';
import { CreateTransactionData} from "../../types/types";
import {Observable} from "rxjs";
import * as auth from "../authorization";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:3000/transaction';
  constructor(private http: HttpClient) { }

  createTransaction(data: CreateTransactionData): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/create`, data, { headers });
  }
}
