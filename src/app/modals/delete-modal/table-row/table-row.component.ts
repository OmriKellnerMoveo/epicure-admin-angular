import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../../models/restaurant.model";
import {Chef} from "../../../models/chefs.model";
import {Dish} from "../../../models/dish.model";
import {LocalMode} from "../../../services/global-api.service";

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
@Input() deletedRestaurantId:Restaurant
@Input() deletedChefId:Chef
@Input() deletedDishId:Dish
@Input() objectType:string
  assetsPathDeleteImage:string
  constructor() { }

  ngOnInit(): void {
    if (LocalMode){
      this.assetsPathDeleteImage="../assets"
    }else {
      this.assetsPathDeleteImage="./assets"
    }
  }

}
