import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Chef } from "../models/chefs.model";

@Injectable({
    providedIn: 'root'
})
export class ChefsService{
    chefs: Chef[]=[];
    
    constructor(private http: HttpClient){}

    getAllChefs(){
      this.chefs=[]
    return this.http.get('http://localhost:9000/api/v1/chef')
        .pipe(map((responseData: Chef)=>{
          for(const key in responseData){
            this.chefs.push(responseData[key])
          }
        return this.chefs
        }))
      }
      addChef(obj) {
        console.log(obj);
        return this.http.post(
          'http://localhost:9000/api/v1/chef',
          obj
        );
      }
    
      updateChef(id, obj) {
        console.log(id, obj);
        return this.http.put(
          `http://localhost:9000/api/v1/chef/${id}`,
          obj
        );
      }

      deleteChef(id) {
        console.log(id)
        return this.http.delete(
          `http://localhost:9000/api/v1/chef/${id}`
        );
      }
}
