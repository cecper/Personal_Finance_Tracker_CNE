import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RegisterComponent = class RegisterComponent {
    constructor(service, fb, router) {
        this.service = service;
        this.fb = fb;
        this.router = router;
        this.submitted = false;
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }
    register() {
        this.submitted = true;
        if (this.registerForm.valid) {
            const formData = {
                username: this.registerForm.get('username')?.value || '',
                email: this.registerForm.get('email')?.value || '',
                password: this.registerForm.get('password')?.value || '',
            };
            this.service.registerUser(formData).subscribe((response) => {
                this.router.navigateByUrl('/home');
            }, (error) => {
            });
        }
        else {
            // Form is invalid, handle accordingly
        }
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map