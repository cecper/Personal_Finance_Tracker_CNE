import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginData} from "../../types/types";
import {Observable, tap} from "rxjs";
import * as auth from "../authorization";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment"; // Import environment
import { getTokenId } from "../../service/authorization";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private baseUrl = environment.baseUrl;
  //private baseUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {
  }

  login(data: LoginData) : Observable<any>{
    return this.http.post(`${this.baseUrl}/LoginHttpTrigger`, data).pipe(
      tap(res => this.setSession(res,data.username))
    );
  }

  private setSession(authResult:any,username:string) {
    sessionStorage.setItem('id_token', authResult.token);
    sessionStorage.setItem('username', username);
  }

  isAuthenticated() {
    const token=getTokenId();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
}
