import { HttpHeaders } from "@angular/common/http";

function getAuthorizationHeader(): HttpHeaders {
  const token = localStorage.getItem('id_token') || '';
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}

function getUsername(): string {
  return localStorage.getItem('username') || '';
}

function isLoggedIn(): boolean {
  return !!localStorage.getItem('id_token');
}

export { getAuthorizationHeader, getUsername, isLoggedIn };
