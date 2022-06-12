import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {Dish} from "../../models/dish.model";
import {RestaurantsService} from "../../services/restaurants.service";
import {Restaurant} from "../../models/restaurant.model";

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss']
})
export class DishModalComponent implements OnInit {
  dishForm:FormGroup;
  @Input() message: string;
  @Input() actionMode: string;
  @Input() editDish: Dish;
  @Output() dishCreated= new EventEmitter<Dish>();
  @Output() closeModalPopup= new EventEmitter<Boolean>();
  dishTags:string[];
  tags: Array<string> =["Spicy", "Vegan", "Vegetarian"]
  dishesImages:string[]=[
    'garbanzoFriyoImage',
    'padKi_image',
    'smokedPizzaImage'
  ]
  restaurants:Restaurant[]
  constructor(private restaurantsService:RestaurantsService) { }

  ngOnInit(): void {
    console.log(this.editDish.restaurant_id['name'],'dish')
    this.restaurantsService.getAllRestaurants().subscribe((restaurant) => {
      this.restaurants = restaurant;
      console.log(this.restaurants);
    });

    this.dishTags=this.editDish.tags

    this.dishForm= new FormGroup({
      _id: new FormControl(this.editDish._id ?this.editDish._id : '' ),
      name: new FormControl(this.editDish.name? this.editDish.name : '',Validators.required),
      image: new FormControl(this.editDish.image? this.editDish.image : ''),
      price: new FormControl(this.editDish.price? this.editDish.price : ''),
      description: new FormControl(this.editDish.description? this.editDish.description : ''),
      tags: new FormControl(this.editDish.tags? this.editDish.tags : []),
      restaurant_id: new FormControl(this.editDish.restaurant_id? this.editDish.restaurant_id : ''),
    })

  }

  onSubmit(){
    this.dishForm.value.tags=this.dishTags
    console.log(this.dishForm.value)

    // this.
    this.dishCreated.emit(this.dishForm.value)
  }

  closeModal(){
    this.closeModalPopup.emit(false);
  }
  setDishTag(event){
    if (event.target.checked){
      if (this.dishTags[0]===''){
        this.dishTags[0]=event.target.value
      }
      else {
        this.dishTags.push(event.target.value)
      }
    }
    else {
      console.log(this.dishTags.indexOf(event.target.value))
      this.dishTags.splice(this.dishTags.indexOf(event.target.value),1)
    }
}
}
