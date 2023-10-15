import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePiggybankData } from "../../types/types";
import * as auth from "../authorization";

@Injectable({
  providedIn: 'root'
})
export class PiggybankService {
  private baseUrl = 'http://localhost:3000/piggybank';

  constructor(private http: HttpClient) {}

  createPiggybank(data: CreatePiggybankData): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/create`, data, { headers });
  }

  getAllPiggybanks(): Observable<any> {
    const headers = auth.getAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/getall`, { headers });
  }
}
