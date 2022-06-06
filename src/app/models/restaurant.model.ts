import { Chef } from "./chefs.model";
import {Dish} from "./dish.model";

export interface Restaurant {
    _id:string,
    name:string,
    image: string,
    isPopular: boolean,
    Chef: Chef,
    signature_dish: Dish
}
