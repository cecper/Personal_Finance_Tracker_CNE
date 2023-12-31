// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PiggybankoverviewComponent } from './piggybank/piggybankoverview/piggybankoverview.component';
import { PiggybankcreateComponent } from './piggybank/piggybankcreate/piggybankcreate.component';
import { AuthGuard } from './auth.guard';
import {TransactioncreateComponent} from "./transaction/transactioncreate/transactioncreate.component"; // Adjust the import path based on your actual project structure
import { TransactionOverviewByPiggybankComponent } from './transaction/transaction-overview-by-piggybank/transaction-overview-by-piggybank.component';
import { PiggybankDeleteConfirmComponent } from './piggybank/piggybank-delete-confirm/piggybank-delete-confirm.component';
import { TransactionDeleteConfirmComponent } from './transaction/transaction-delete-confirm/transaction-delete-confirm.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  {
    path: 'piggybank/overview',
    component: PiggybankoverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'piggybank/create',
    component: PiggybankcreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'piggybank/delete/:piggybankId',
    component: PiggybankDeleteConfirmComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'transaction/create/:piggybankId',
    component: TransactioncreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'transaction/all/:piggybankId',
    component: TransactionOverviewByPiggybankComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'transaction/delete/:transactionId/:piggybankId',
    component: TransactionDeleteConfirmComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
