import { Component, OnInit } from '@angular/core';
import * as auth from '../../service/authorization';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn = auth.isLoggedIn();

  constructor() { }


  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  updateLoginStatus() {
    this.isLoggedIn = auth.isLoggedIn();
    return this.isLoggedIn;
  }

  logout() {
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('username');
  }
}
