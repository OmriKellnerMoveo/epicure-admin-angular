import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../models/restaurant.model';
import {RestaurantsService} from '../../services/restaurants.service';

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.scss'],
    providers: [RestaurantsService],
})
export class RestaurantsComponent implements OnInit {
    restaurants: Restaurant[] = [];
    objectType: string = 'Restaurant';
    actionMode: string = "add";
    message: string;
    editRestaurant: Restaurant;
    showModal: boolean = false;
    showDeleteModal: boolean = false;
    deletedRestaurantId: Restaurant;

    constructor(private restaurantsService: RestaurantsService) {
    }

    ngOnInit(): void {
        this.fetchDishes()
    }

    fetchDishes() {
        this.restaurantsService.getAllRestaurants().subscribe((restaurant) => {
            this.restaurants = restaurant;
            console.log(this.restaurants);
        });
    }

    setShowModal(action: string): void {
        this.showModal = !this.showModal;
        this.actionMode = action;
    }

    setModal(restaurant?: Restaurant, action: string = "") {
        this.showModal = true;
        this.editRestaurant = restaurant
        this.actionMode = action;
    }

    setDeleteModal(restaurant?: Restaurant) {
        this.showDeleteModal = true;
        this.deletedRestaurantId = restaurant
    }


    closeModal(boolAction) {
        this.showModal = boolAction;
    }

    closeDeleteModal(status) {
        this.showDeleteModal = status;
    }

    addRestaurant(Restaurant) {
        console.log(Restaurant)
        Restaurant['_id'] === '' ? this.restaurantsService
            .addRestaurant({
                "name": Restaurant.name,
                "isPopular": Restaurant.isPopular,
                "image": Restaurant.image,
                "Chef": Restaurant.Chef
            })
            .subscribe((restaurant) => {
                this.fetchDishes()
                console.log(restaurant);
            }) : this.restaurantsService
            .updateRestaurant(Restaurant['_id'], {
                "name": Restaurant.name,
                "isPopular": Restaurant.isPopular,
                "image": Restaurant.image,
                "Chef": Restaurant.Chef,
                "signature_dish": Restaurant.signature_dish
            })
            .subscribe((restaurant) => {
                this.fetchDishes()
                console.log(restaurant);
            })
        this.showModal = false;
    }

    deleteRestaurant(restaurant) {
        this.restaurantsService.deleteRestaurant(restaurant).subscribe((restaurant) => {
            console.log(restaurant);
            this.fetchDishes()
            this.showDeleteModal = false;
        });
    }
}
