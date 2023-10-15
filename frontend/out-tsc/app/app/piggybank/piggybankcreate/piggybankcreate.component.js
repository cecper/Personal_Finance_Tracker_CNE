import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { getUsername } from "../../../service/authorization";
let PiggybankcreateComponent = class PiggybankcreateComponent {
    constructor(loginservice, service, fb) {
        this.loginservice = loginservice;
        this.service = service;
        this.fb = fb;
        this.submitted = false;
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            balance: ['', [Validators.required]], // Assuming balance is a number
        });
    }
    create() {
        this.submitted = true;
        if (this.registerForm.valid) {
            const formData = {
                name: this.registerForm.get('name')?.value || '',
                balance: this.registerForm.get('balance')?.getRawValue() || 0,
                username: getUsername(),
            };
            if (formData.username === '') {
                console.error('User ID is empty, cannot create piggybank');
                return;
            }
            this.service.createPiggybank(formData).subscribe((response) => {
                console.log('Piggybank creation successful:', response);
                // Handle success as needed
            }, (error) => {
                console.error('Error creating piggybank:', error);
                // Handle error as needed
            });
        }
    }
};
PiggybankcreateComponent = __decorate([
    Component({
        selector: 'app-piggybankcreate',
        templateUrl: './piggybankcreate.component.html',
        styleUrls: ['./piggybankcreate.component.css']
    })
], PiggybankcreateComponent);
export { PiggybankcreateComponent };
//# sourceMappingURL=piggybankcreate.component.js.map