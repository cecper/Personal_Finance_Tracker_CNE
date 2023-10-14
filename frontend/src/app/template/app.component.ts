import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor() { }
  isLoggedIn(): boolean {
    // Check if the 'username' key in localStorage is not empty
    return !!localStorage.getItem('username');
  }

  getUsername(): string | null {
    // Get the username from localStorage
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem('username');
  }
}
