import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {CreatePiggybankData, LoginData} from "../../types/types";
import * as auth from "../authorization";

@Injectable({
  providedIn: 'root'
})
export class PiggybankService {
  private baseUrl = 'http://localhost:3000/piggybank';

  constructor(private http: HttpClient) {}

  createPiggybank(data: CreatePiggybankData): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`https://functies.azurewebsites.net/api/CreatePiggybankHttpTrigger`, data, { headers });
  }

  getAllPiggybanks(): Observable<any> {
    const headers = auth.getAuthorizationHeader();

    return this.http.post(`https://functies.azurewebsites.net/api/getAllPiggybanksHttpTrigger?code=_mNZl9dsAzOlyLLq7Wld635b0h2FbD_EOwpz6KlcrM3UAzFuj_lKyw==`,{"username":auth.getUsername()}, { headers });
  }
}
