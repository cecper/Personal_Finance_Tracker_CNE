import { Component, OnInit } from '@angular/core';
import { PiggybankService } from '../../../service/piggybank/piggybank.service'; // Update with the correct path

@Component({
    selector: 'app-piggybankoverview',
    templateUrl: './piggybankoverview.component.html',
    styleUrls: ['./piggybankoverview.component.css']
})
export class PiggybankoverviewComponent implements OnInit {
    piggybanks: any[] = []; // Update the type according to your data structure
  serverError: string | null = null;
    constructor(private piggybankService: PiggybankService) {}

    ngOnInit(): void {
        this.loadPiggybanks();
    }

    loadPiggybanks() {
        this.piggybankService.getAllPiggybanks().subscribe(
            (data: any) => {
                this.piggybanks = data;
            },
            (error: any) => {
                this.serverError = "Something went wrong. Please try again later.";
            }
        );
    }
}
