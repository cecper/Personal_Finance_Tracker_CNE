import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let RegisterServiceService = class RegisterServiceService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3000/user';
    }
    registerUser(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }
};
RegisterServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RegisterServiceService);
export { RegisterServiceService };
//# sourceMappingURL=register-service.service.js.map