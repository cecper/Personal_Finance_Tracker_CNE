import { Component, OnInit } from '@angular/core';
import { PiggybankService } from '../../../service/piggybank/piggybank.service'; // Update with the correct path

@Component({
    selector: 'app-piggybankoverview',
    templateUrl: './piggybankoverview.component.html',
    styleUrls: ['./piggybankoverview.component.css']
})
export class PiggybankoverviewComponent implements OnInit {
    piggybanks: any[] = []; // Update the type according to your data structure

    constructor(private piggybankService: PiggybankService) {}

    ngOnInit(): void {
        this.loadPiggybanks();
    }

    loadPiggybanks() {
        this.piggybankService.getAllPiggybanks().subscribe(
            (data: any) => {
                console.log(data)
                this.piggybanks = data; // Assuming your response is an array of piggybanks
            },
            (error: any) => {
                console.error('Error loading piggybanks:', error);
            }
        );
    }
}
