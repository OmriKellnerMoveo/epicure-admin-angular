import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Restaurant} from "../../models/restaurant.model";
import {Chef} from "../../models/chefs.model";
import {RestaurantModalComponent} from "../restaurant-modal/restaurant-modal.component";
import {Dish} from "../../models/dish.model";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() deletedRestaurantId: Restaurant;
  @Input() deletedChefId: Chef;
  @Input() deletedDishId: Dish;
  @Input() objectType: string;
  @Output() closeDeleteModalPopup= new EventEmitter<Boolean>();
  @Output() SelectedForDelete= new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    if (this.objectType==='Restaurant'){
      this.SelectedForDelete.emit(this.deletedRestaurantId['_id'])
    }else if (this.objectType==='Chef') {
      this.SelectedForDelete.emit(this.deletedChefId['_id'])
    }
    else {
      this.SelectedForDelete.emit(this.deletedDishId['_id'])
    }
    this.closeDeleteModalPopup.emit(false);
  }

  closeModal(){
    this.closeDeleteModalPopup.emit(false);
  }
}
