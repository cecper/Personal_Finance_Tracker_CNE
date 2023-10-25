import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PiggybankService } from 'src/service/piggybank/piggybank.service';

@Component({
  selector: 'app-piggybank-delete-confirm',
  templateUrl: './piggybank-delete-confirm.component.html',
  styleUrls: ['./piggybank-delete-confirm.component.css']
})
export class PiggybankDeleteConfirmComponent implements OnInit{
  piggybankId:string='';
  serverError: string | null = null;
  constructor(private router:Router,private route: ActivatedRoute,private service:PiggybankService) { }

  ngOnInit() {
    this.piggybankId = String(this.route.snapshot.paramMap.get('piggybankId'));
  }

  onAccept() {
    this.service.deletePiggybank(this.piggybankId).subscribe(
      () => {
        this.router.navigate(['/piggybank/overview']);
      },
      (error) => {
        this.serverError = error;
      }
    );
  }

  onCancel() {
    this.router.navigate(['/piggybank/overview']);
  }
}
