import {Restaurant} from "./restaurant.model";

export interface Dish {
    _id:string,
    name:string,
    image: string,
    description: string,
    price:number
    restaurant_id:Restaurant
    tags:string[]
}
