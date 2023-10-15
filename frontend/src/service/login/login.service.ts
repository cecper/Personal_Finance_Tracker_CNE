import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginData} from "../../types/types";
import {Observable, tap} from "rxjs";
import * as auth from "../authorization";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {
  }

  login(data: LoginData) : Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap(res => this.setSession(res,data.username))
    );
  }

  private setSession(authResult:any,username:string) {
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('username', username);
  }

  getUserId(username: string): Observable<any> {
    const headers = auth.getAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/getUserId/${username}`, { headers });
  }
}
