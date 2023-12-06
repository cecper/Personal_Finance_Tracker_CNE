import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {CreatePiggybankData, LoginData} from "../../types/types";
import * as auth from "../authorization";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PiggybankService {
  //private baseUrl = 'https://functies.azurewebsites.net/api';
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  createPiggybank(data: CreatePiggybankData): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/CreatePiggybankHttpTrigger`, data, { headers });
  }

  getAllPiggybanks(): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/getAllPiggybanksHttpTrigger`,{"username":auth.getUsername()}, { headers });
  }

  deletePiggybank(id: string,username: string): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`${this.baseUrl}/deletepiggybankbyidhttptrigger`,{"piggyBankId":id , "userName": username}, { headers });
  }
}
