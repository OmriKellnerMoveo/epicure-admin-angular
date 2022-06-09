import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Chef } from "../models/chefs.model";
import {GlobalApiService} from "./global-api.service";


@Injectable({
    providedIn: 'root'
})
export class ChefOfTheWeekService{
    chef: Chef;
    
    constructor(private http: HttpClient){}

    getChefOfTheWeek(){
    return this.http.get(`${GlobalApiService}/api/v1/chefOfTheWeek`)
        .pipe(map((responseData: Chef)=>{
          for(const key in responseData){
            this.chef=(responseData[key])
          }
        return this.chef
        }))
      }

    updateChefOfTheWeek(id) {
        console.log('#### UPDATE CHEF OF THE WEEK #####')
    console.log(id)
          let object= {Chef:id}
    console.log(object)
        return this.http.put(
            `${GlobalApiService}/api/v1/chefOfTheWeek`,
            object
        );
      }
}
