import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegistrationData} from "../../types/types";
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

 // private baseUrl = 'http://localhost:3000/user';
  private baseUrl = environment.baseUrl;
  constructor(private http : HttpClient) {}

  registerUser(data: RegistrationData): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateAccountHttpTrigger`, data);
  }

  checkDupeUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/checkDupeUsername/${username}`);
  }
}
