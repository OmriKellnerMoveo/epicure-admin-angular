import {Component, OnInit} from '@angular/core';
import {DishesService} from '../../services/dishes.service';
import {Dish} from "../../models/dish.model";

@Component({
    selector: 'app-dishes',
    templateUrl: './dishes.component.html',
    styleUrls: ['./dishes.component.scss'],
    providers: [DishesService]
})
export class DishesComponent implements OnInit {
    dishes: Dish[];
    objectType: string = 'Dish';
    actionMode: string = "add";
    message: string;
    editDish: Dish;
    showModal: boolean = false;
    showDeleteModal: boolean = false;
    deletedDishId: Dish;

    constructor(private dishesService: DishesService) {
    }

    ngOnInit(): void {
        this.fetchDishes()
    }

    fetchDishes() {
        console.log('****** FETCHING Dishes *******')
        this.dishesService.getAllDishes().subscribe(dishes => {
            this.dishes = dishes;
            console.log(this.dishes)
        });
    }

    setDeleteModal(dish: Dish) {
        this.showDeleteModal = true
        this.deletedDishId = dish;
    }

    closeModal(status) {
        this.showModal = status;
    }

    setShowModal(action: string): void {
        this.showModal = !this.showModal;
        this.actionMode = action;
    }

    setModal(dish?: Dish, action: string = "") {
        this.showModal = true;
        this.editDish = dish
        this.actionMode = action;
    }

    closeDeleteModal(isOpen) {
        this.showDeleteModal = isOpen;
    }

    deleteDish(dish) {
        console.log(dish)
        this.dishesService.deleteDish(dish).subscribe((dish) => {
            console.log(dish);
            this.fetchDishes()
            this.showDeleteModal = false;
        });
    }

    addDish(dish) {
        dish._id === "" ? this.dishesService
            .addDish(dish)
            .subscribe((dish) => {
                this.fetchDishes()
                console.log(dish);
            }) : this.dishesService
            .updateDish(dish._id, dish)
            .subscribe((dish) => {
                this.fetchDishes()
                console.log(dish);
            })
        this.showModal = false;
    }
}
