import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { PiggybankoverviewComponent } from "./piggybank/piggybankoverview/piggybankoverview.component";
import { PiggybankcreateComponent } from "./piggybank/piggybankcreate/piggybankcreate.component";
const routes = [{ path: 'login', component: LoginComponent }, { path: 'register', component: RegisterComponent }, { path: 'home', component: HomeComponent },
    { path: 'piggybank/overview', component: PiggybankoverviewComponent }, { path: 'piggybank/create', component: PiggybankcreateComponent }];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map