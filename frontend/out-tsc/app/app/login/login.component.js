import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from "@angular/forms";
let LoginComponent = class LoginComponent {
    constructor(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    login() {
        const val = this.form.value;
        const loginData = {
            username: val.username,
            password: val.password
        };
        if (loginData.username && loginData.password) {
            console.log("LoginComponent: login: loginData: ", loginData);
            this.authService.login(loginData)
                .subscribe(() => {
                this.router.navigateByUrl('/');
            });
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map