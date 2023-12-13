import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './template/app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { PiggybankoverviewComponent } from './piggybank/piggybankoverview/piggybankoverview.component';
import { PiggybankcreateComponent } from './piggybank/piggybankcreate/piggybankcreate.component';
import { TransactioncreateComponent } from './transaction/transactioncreate/transactioncreate.component';
import { TransactionOverviewByPiggybankComponent } from './transaction/transaction-overview-by-piggybank/transaction-overview-by-piggybank.component';
import { PiggybankDeleteConfirmComponent } from './piggybank/piggybank-delete-confirm/piggybank-delete-confirm.component';
import { TransactionDeleteConfirmComponent } from './transaction/transaction-delete-confirm/transaction-delete-confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PiggybankoverviewComponent,
    PiggybankcreateComponent,
    TransactioncreateComponent,
    TransactionOverviewByPiggybankComponent,
    PiggybankDeleteConfirmComponent,
    TransactionDeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
