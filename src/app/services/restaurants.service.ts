import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  restaurants: Restaurant[] = [];

  constructor(private http: HttpClient) {}

  getAllRestaurants() {
    this.restaurants=[]
    return this.http.get('http://localhost:9000/api/v1/restaurant').pipe(
      map((responseData: Restaurant) => {
        for (const key in responseData) {
          this.restaurants.push(responseData[key]);
        }
        return this.restaurants;
      })
    );
  }
  // getAllRestaurants = async (setPopularRestaurants) => {
  //   try {
  //     const url = `http://localhost:9000/api/v1/restaurant`;
  //     const response = await fetch(url)
  //     const responseJson = await response.json();
  //     setPopularRestaurants(responseJson)
  //   }catch (err){
  //     console.log(err)
  //   }
  // }



  addRestaurant(obj) {
    console.log(obj);
    console.log('add');
    return this.http.post(
      'http://localhost:9000/api/v1/restaurant',
        obj
    );
  }

  updateRestaurant(id, obj) {
    console.log(id, obj);
    console.log('update');
    return this.http.put(
      `http://localhost:9000/api/v1/restaurant/${id}`,
      obj
    );
  }

  deleteRestaurant(id) {
    console.log(id);
    return this.http.delete(
      `http://localhost:9000/api/v1/restaurant/${id}`
    );
  }
}
