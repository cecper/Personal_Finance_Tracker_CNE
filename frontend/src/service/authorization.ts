import { HttpHeaders } from "@angular/common/http";

function getAuthorizationHeader(): HttpHeaders {
  const token = sessionStorage.getItem('id_token') || '';
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}

function getUsername(): string {
  return sessionStorage.getItem('username') || '';
}

function getTokenId(): string {
  return sessionStorage.getItem('id_token') || '';
}

function isLoggedIn(): boolean {
  return !!sessionStorage.getItem('id_token');
}

export { getAuthorizationHeader, getUsername, isLoggedIn, getTokenId };
