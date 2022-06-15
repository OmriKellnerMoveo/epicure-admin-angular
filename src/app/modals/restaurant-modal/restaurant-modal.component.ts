import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Chef} from 'src/app/models/chefs.model';
import {ChefsService} from 'src/app/services/chefs.service';
import {DishesService} from 'src/app/services/dishes.service';
import {Restaurant} from '../../models/restaurant.model';
import {Dish} from "../../models/dish.model";

@Component({
    selector: 'app-restaurant-modal',
    templateUrl: './restaurant-modal.component.html',
    styleUrls: ['./restaurant-modal.component.scss'],
    providers: [ChefsService, DishesService]
})
export class RestaurantModalComponent implements OnInit {
    @Input() message: string;
    @Input() actionMode: string;
    @Input() editRestaurant: Restaurant;
    @Output() closeEditModal = new EventEmitter<Boolean>();
    @Output() restaurantCreated = new EventEmitter<Restaurant>();
    ChooseImage: boolean=true;


    chefs: Chef[];
    isPopular: boolean[] = [true, false]
    restaurantForm: FormGroup;
    restaurantDishes: Dish[]
    @Input() restaurantImages;
    newChefList:Chef[];
    newDishList:Dish[];
    constructor(private chefsService: ChefsService, private dishService: DishesService) {
    }

    ngOnInit(): void {
        this.fetchGetAllChefs();
        this.fetchGetAllRestaurantDishes();
        this.restaurantForm = new FormGroup({
            _id: new FormControl(this.editRestaurant._id ? this.editRestaurant._id : ''),
            name: new FormControl(this.editRestaurant.name ? this.editRestaurant.name : '', Validators.required),
            image: new FormControl(this.editRestaurant.image ? this.editRestaurant.image : ''),
            Chef: new FormControl(this.editRestaurant['Chef'] ? this.editRestaurant['Chef'] : '', Validators.required),
            isPopular: new FormControl(this.editRestaurant.isPopular ? this.editRestaurant.isPopular : false),
            signature_dish: new FormControl(this.editRestaurant.signature_dish ? this.editRestaurant.signature_dish :null),
        })
    }

    fetchGetAllChefs() {
        this.chefsService.getAllChefs().subscribe(chefs => {
            this.chefs = chefs;
            if (this.actionMode === 'edit') {
                this.CreateListWithoutObj(this.editRestaurant['Chef'], this.chefs)
            }
        });
    }
    setImageOption(event){
        if (event.target.value==='Choose'){
            this.ChooseImage=true
        }
        else {
            this.ChooseImage=false
        }
    }

    CreateListWithoutObj(objA:Chef,objB:Chef[]){
        this.newChefList=[]
        objB.map((obj)=>{
            if (obj["_id"]!==objA['_id']){
                this.newChefList.push(obj)
            }
        })
    }

    fetchGetAllRestaurantDishes() {
        if (this.actionMode === 'edit') {
            this.dishService.getAllRestaurantDishes(this.editRestaurant['_id']).subscribe(dish => {
                this.restaurantDishes = dish;
                if (this.editRestaurant.signature_dish){
                    this.CreateDishesListWithoutObj(this.editRestaurant.signature_dish, this.restaurantDishes)
                }
            });

        }
    }
    CreateDishesListWithoutObj(objA:Dish,objB:Dish[]){
        this.newDishList=[]
        objB.map((obj)=>{
            if (obj["_id"]!==objA['_id']){
                this.newDishList.push(obj)
            }
        })
    }
    onSubmit() {
        console.log(this.restaurantForm.value,'rest before update')
        this.restaurantCreated.emit(this.restaurantForm.value)
    }

    close_Edit_Modal() {
        this.closeEditModal.emit(false)
    }
    compareTwoObj(objA:string,objB:string):boolean
    {
        console.log(objA,'A')
        console.log(objB,'B')
        console.log(objA===objB)
        return objA===objB
    }
}
