import { HttpHeaders } from "@angular/common/http";
function getAuthorizationHeader() {
    const token = localStorage.getItem('id_token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}
function getUsername() {
    return localStorage.getItem('username') || '';
}
export { getAuthorizationHeader, getUsername };
//# sourceMappingURL=authorization.js.map