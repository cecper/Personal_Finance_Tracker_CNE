import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'frontend';
    }
    isLoggedIn() {
        // Check if the 'username' key in localStorage is not empty
        return !!localStorage.getItem('username');
    }
    getUsername() {
        // Get the username from localStorage
        return localStorage.getItem('username');
    }
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem('username');
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map