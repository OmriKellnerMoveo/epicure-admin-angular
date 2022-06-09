import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Dish} from "../models/dish.model";
import {GlobalApiService} from "./global-api.service";

@Injectable({
    providedIn: 'root'
})
export class DishesService{
    dishes: Dish[]=[];
    restaurantDishes: Dish[]=[];

    constructor(private http: HttpClient){}

    getAllDishes(){
      this.dishes=[]
    return this.http.get(`${GlobalApiService}/api/v1/dish`)
        .pipe(map((responseData: Dish)=>{
          for(const key in responseData){
            this.dishes.push(responseData[key])
          }
        return this.dishes
        }))
      }
    getAllRestaurantDishes(id){
        this.dishes=[]
        return this.http.get(`${GlobalApiService}/api/v1/dish/restaurants/${id}`)
            .pipe(map((responseData: Dish)=>{
                for(const key in responseData){
                    this.restaurantDishes.push(responseData[key])
                }
               if (this.restaurantDishes!==null){
                   return this.restaurantDishes
               }
            }))
    }
      addDish(obj) {
        console.log(obj);
        return this.http.post(
            `${GlobalApiService}/api/v1/dish`,
          obj
        );
      }
    
      updateDish(id, obj) {
        console.log(id, obj);
        return this.http.put(
            `${GlobalApiService}/api/v1/dish/${id}`,
          obj
        );
      }

      deleteDish(id) {
        return this.http.delete(
            `${GlobalApiService}/api/v1/dish/${id}`
        );
      }
}
