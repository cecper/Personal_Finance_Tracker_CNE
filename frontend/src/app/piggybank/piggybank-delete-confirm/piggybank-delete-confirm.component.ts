import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PiggybankService } from 'src/service/piggybank/piggybank.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-piggybank-delete-confirm',
  templateUrl: './piggybank-delete-confirm.component.html',
  styleUrls: ['./piggybank-delete-confirm.component.css']
})
export class PiggybankDeleteConfirmComponent implements OnInit{
  piggybankId:string='';
  serverError: string | null = null;
  constructor(private router:Router,private route: ActivatedRoute,private service:PiggybankService,private location: Location) { }




  ngOnInit() {
    this.piggybankId = String(this.route.snapshot.paramMap.get('piggybankId'));
  }

  onAccept() {
    const username = localStorage.getItem('username') as string;
    this.service.deletePiggybank(this.piggybankId,username).subscribe(
      () => {
        this.location.back();
      },
      (error) => {
        this.serverError = error;
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
