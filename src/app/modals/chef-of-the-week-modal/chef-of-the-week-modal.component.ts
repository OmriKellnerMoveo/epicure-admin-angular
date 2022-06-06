import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chef} from "../../models/chefs.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChefsService} from "../../services/chefs.service";
import {ChefOfTheWeekService} from "../../services/chefOfTheWeek.service";

@Component({
    selector: 'app-chef-of-the-week-modal',
    templateUrl: './chef-of-the-week-modal.component.html',
    styleUrls: ['./chef-of-the-week-modal.component.scss']
})
export class ChefOfTheWeekModalComponent implements OnInit {
    message: 'Edit Chef Of The Week:'
    @Input() chefs: Chef[]
    chefForm: FormGroup
    chefOfTheWeekId: string
    @Output() closeModalPopup = new EventEmitter<Boolean>();
    @Output() editChefOfTheWeek = new EventEmitter<string>();

    constructor(private chefsService: ChefsService, private chefOfTheWeekService: ChefOfTheWeekService) {
    }

    ngOnInit(): void {
        this.fetchChefOfTheWeek()

        this.chefForm = new FormGroup({
            Chef: new FormControl(this.chefs ? this.chefs : ''),
        })
    }

    fetchChefOfTheWeek() {
        this.chefOfTheWeekService.getChefOfTheWeek().subscribe((chef) => {
            this.chefOfTheWeekId = chef['_id']
        })
    }

    onSubmit() {
        console.log('############ on submit')

        this.editChefOfTheWeek.emit(this.chefForm.value['Chef']['_id'])
        this.closeModalPopup.emit(false);
    }

    closeModal() {
        this.closeModalPopup.emit(false);
    }
}
