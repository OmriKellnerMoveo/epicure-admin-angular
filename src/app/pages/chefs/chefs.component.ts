import { Component, OnInit } from "@angular/core";
import { Chef } from "../../models/chefs.model";
import { ChefOfTheWeekService } from "../../services/chefOfTheWeek.service";
import { ChefsService } from "../../services/chefs.service";

@Component({
  selector: "app-chefs",
  templateUrl: "./chefs.component.html",
  styleUrls: ["./chefs.component.scss"],
  providers: [ChefsService],
})
export class ChefsComponent implements OnInit {
  chefs: Chef[] = [];
  objectType:string = 'Chef';
  actionMode: string = "add";
  message: string;
  editChef: Chef;
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  chefOfTheWeekShowModal:boolean = false
  deletedChefId: Chef={    _id:'',
    name:'',
    image: '',
    description: ''};
  chefOfTheWeek: Chef = {    _id:'',
    name:'',
    image: '',
    description: ''};

  constructor(
    private chefsService: ChefsService,
    private chefOfTheWeekService: ChefOfTheWeekService
  ) {}

  ngOnInit(): void {
   this.fetchChef()
   this.fetchChefOfTheWeek()
  }
  fetchChef(){
    console.log('****** FETCHING CHEFS *******')
    this.chefsService.getAllChefs().subscribe((chefs) => {
      this.chefs = chefs;
      console.log('CHEFS FROM SERVER: ',this.chefs);
    });
  }
  fetchChefOfTheWeek(){
    console.log('****** FETCHING CHEF OF THE WEEK  *******')
    this.chefOfTheWeekService.getChefOfTheWeek().subscribe((chef) => {
      this.chefOfTheWeek = chef;
    });
  }
  setChefOfTheWeekModal(){
    this.chefOfTheWeekShowModal = !this.chefOfTheWeekShowModal
  }

  setModal( chef?: Chef,action:string=""){
    this.showModal = true;
    this.editChef=chef
    this.actionMode = action;
  }
  setShowModal(action:string):void{
    this.showModal = !this.showModal;
    this.actionMode = action;
  }
  closeModal(boolAction) {
    this.showModal = boolAction;
  }
  closeChefOfTheWeekModal(boolAction) {
    this.chefOfTheWeekShowModal = boolAction;
  }
  addChef(chef) {
    console.log(chef)
    chef['_id']==='' ? this.chefsService
        .addChef({"name":chef.name,"image" :chef.image,"description":chef.description})
        .subscribe((chef) => {
          console.log(chef);
          console.log(chef,'test bar2');
          this.fetchChef()

        }) : this.chefsService
        .updateChef( chef['_id'],{"name":chef.name,"image" :chef.image,"description":chef.description })
        .subscribe((chef) => {
          console.log(chef,'test bar');
          this.fetchChef()
        })
    this.showModal = false;
  }

  openDeleteModal(chef: Chef) {
    this.deletedChefId = chef;
    this.showDeleteModal = !this.showDeleteModal;
  }

  closeDeleteModal(status) {
    this.showDeleteModal = status;
  }
  deleteChef(chef) {
    this.chefsService.deleteChef(chef).subscribe((chef) => {
      console.log(chef,'deleting chef');
      this.showDeleteModal = false;
      this.fetchChef()
    });
  }
  editChefOfTheWeek(chef) {
    this.chefOfTheWeekService.updateChefOfTheWeek(chef).subscribe((chef) => {
      console.log(chef,'update chef');
      this.fetchChefOfTheWeek()
    });
  }
}

