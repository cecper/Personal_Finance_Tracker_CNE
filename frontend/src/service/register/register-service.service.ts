import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegistrationData} from "../../types/registration.type";
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private baseUrl = 'http://localhost:3000/user';
  constructor(private http : HttpClient) {}

  registerUser(data: RegistrationData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }
}
