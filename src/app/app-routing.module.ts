import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChefsComponent } from "./pages/chefs/chefs.component";
import { DishesComponent } from "./pages/dishes/dishes.component";
import { RestaurantsComponent } from "./pages/restaurants/restaurants.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {RegisterComponent} from "./pages/register/register.component";

let isLoggedIn:boolean=false;
    if(localStorage.getItem("token")){
        isLoggedIn=true
    }
const appRoutes: Routes=[
    {path: 'admin/chefs', component: ChefsComponent,canActivate: [AuthGuardService] },
    {path: 'admin/restaurants', component: RestaurantsComponent ,canActivate: [AuthGuardService] },
    {path: 'admin/dishes', component: DishesComponent,canActivate: [AuthGuardService] },

    // {path: 'admin', redirectTo: isLoggedIn?'/restaurants':'/login', pathMatch: 'full'},
    {path: 'restaurants', component: RestaurantsComponent ,canActivate: [AuthGuardService] },
    {path: 'chefs', component: ChefsComponent,canActivate: [AuthGuardService] },
    {path: 'dishes', component: DishesComponent,canActivate: [AuthGuardService] },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: isLoggedIn?RestaurantsComponent:LoginComponent},
    // {path: '**', redirectTo: isLoggedIn?'/restaurants':'/login', pathMatch: 'full'},
]
@NgModule({
 imports:[RouterModule.forRoot(appRoutes)],
 exports:[RouterModule]
})
export class AppRoutingModule{

}
