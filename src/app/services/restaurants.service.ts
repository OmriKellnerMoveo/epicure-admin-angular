import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';
import {GlobalApiService} from "./global-api.service";

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  restaurants: Restaurant[] = [];

  constructor(private http: HttpClient) {}

  getAllRestaurants() {
    this.restaurants=[]
    return this.http.get(`${GlobalApiService}/api/v1/restaurant`).pipe(
      map((responseData: Restaurant) => {
        for (const key in responseData) {
          this.restaurants.push(responseData[key]);
        }
        return this.restaurants;
      })
    );
  }

  addRestaurant(obj) {
    console.log(obj);
    console.log('add');
    return this.http.post(
        `${GlobalApiService}/api/v1/restaurant`,
        obj
    );
  }

  updateRestaurant(id, obj) {
    console.log(id, obj);
    console.log('update');
    return this.http.put(
        `${GlobalApiService}/api/v1/restaurant/${id}`,
      obj
    );
  }

  deleteRestaurant(id) {
    console.log(id);
    return this.http.delete(
        `${GlobalApiService}/api/v1/restaurant/${id}`
    );
  }
}
