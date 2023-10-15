import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3000/user';
    }
    login(data) {
        return this.http.post(`${this.baseUrl}/login`, data).pipe(tap(res => this.setSession(res, data.username)));
    }
    setSession(authResult, username) {
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('username', username);
    }
};
LoginService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map