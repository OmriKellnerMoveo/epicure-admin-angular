import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { ChefsComponent } from './pages/chefs/chefs.component';
import { AppRoutingModule } from './app-routing.module';
import { DishesComponent } from './pages/dishes/dishes.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { RestaurantModalComponent } from './modals/restaurant-modal/restaurant-modal.component';
import { ChefModalComponent } from './modals/chef-modal/chef-modal.component';
import { DishModalComponent } from './modals/dish-modal/dish-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { TableRowComponent } from './modals/delete-modal/table-row/table-row.component';
import { ChefOfTheWeekModalComponent } from './modals/chef-of-the-week-modal/chef-of-the-week-modal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthInterceptor} from "./services/token.service";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantsComponent,
    ChefsComponent,
    DishesComponent,
    DeleteModalComponent,
    RestaurantModalComponent,
    ChefModalComponent,
    DishModalComponent,
    TableRowComponent,
    ChefOfTheWeekModalComponent,
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatCardModule,
        MatFormFieldModule,
        MatRadioModule,
    ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
