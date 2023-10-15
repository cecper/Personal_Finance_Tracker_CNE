import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as auth from "../authorization";
let PiggybankService = class PiggybankService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3000/piggybank';
    }
    createPiggybank(data) {
        const headers = auth.getAuthorizationHeader();
        return this.http.post(`${this.baseUrl}/create`, data, { headers });
    }
    getAllPiggybanks() {
        const headers = auth.getAuthorizationHeader();
        return this.http.post(`${this.baseUrl}/getall`, { "username": auth.getUsername() }, { headers });
    }
};
PiggybankService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PiggybankService);
export { PiggybankService };
//# sourceMappingURL=piggybank.service.js.map