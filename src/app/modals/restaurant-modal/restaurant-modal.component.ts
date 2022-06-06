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

textArray:string[]=['1','2','3','4','5']
    chefs: Chef[];
    isPopular: boolean[] = [true, false]
    restaurantForm: FormGroup;
    restaurantDishes: Dish[]
    restaurantImages: string[] = ['claro_img', 'kitchenMarketImage', 'lumina_img', 'mashyaImage', 'onzaImage', 'tiger_Lilly_img']

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
            signature_dish: new FormControl(this.editRestaurant.signature_dish ? this.editRestaurant.signature_dish : 'no dishes', Validators.required),
        })
    }

    fetchGetAllChefs() {
        this.chefsService.getAllChefs().subscribe(chefs => {
            this.chefs = chefs;
        });
    }

    fetchGetAllRestaurantDishes() {
        if (this.actionMode !== 'add') {
            this.dishService.getAllRestaurantDishes(this.editRestaurant['_id']).subscribe(dish => {
                this.restaurantDishes = dish;
            });
        }
    }

    onSubmit() {
        console.log(this.restaurantForm.value,'rest before update')
        this.restaurantCreated.emit(this.restaurantForm.value)
    }

    close_Edit_Modal() {
        this.closeEditModal.emit(false)
    }
}
