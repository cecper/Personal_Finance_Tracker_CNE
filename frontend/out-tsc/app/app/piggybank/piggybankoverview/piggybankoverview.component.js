import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PiggybankoverviewComponent = class PiggybankoverviewComponent {
    constructor(piggybankService) {
        this.piggybankService = piggybankService;
        this.piggybanks = []; // Update the type according to your data structure
    }
    ngOnInit() {
        this.loadPiggybanks();
    }
    loadPiggybanks() {
        this.piggybankService.getAllPiggybanks().subscribe((data) => {
            console.log(data);
            this.piggybanks = data; // Assuming your response is an array of piggybanks
        }, (error) => {
            console.error('Error loading piggybanks:', error);
        });
    }
};
PiggybankoverviewComponent = __decorate([
    Component({
        selector: 'app-piggybankoverview',
        templateUrl: './piggybankoverview.component.html',
        styleUrls: ['./piggybankoverview.component.css']
    })
], PiggybankoverviewComponent);
export { PiggybankoverviewComponent };
//# sourceMappingURL=piggybankoverview.component.js.map