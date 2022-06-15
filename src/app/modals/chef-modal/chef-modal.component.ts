import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chef } from 'src/app/models/chefs.model';

@Component({
  selector: 'app-chef-modal',
  templateUrl: './chef-modal.component.html',
  styleUrls: ['./chef-modal.component.scss']
})
export class ChefModalComponent implements OnInit {
  chefForm:FormGroup;
  @Input() message: string;
  @Input() actionMode: string;
  @Input() editChef: Chef;
  @Output() chefCreated= new EventEmitter<Chef>();
  @Output() closeModalPopup= new EventEmitter<Boolean>();
  ChooseImage: boolean=true;

  @Input() chefImages:string[]
      // =[
    // 'yosi_shitrit_image'
  // ]


  constructor() { }

  ngOnInit(): void {
    this.chefForm= new FormGroup({
      _id: new FormControl(this.editChef._id ?this.editChef._id : '' ),
      name: new FormControl(this.editChef.name? this.editChef.name : '',Validators.required),
      image: new FormControl(this.editChef.image? this.editChef.image : ''),
      description: new FormControl(this.editChef.description? this.editChef.description : ''),
    })
  }
  onSubmit(){
    this.chefCreated.emit(this.chefForm.value)
  }

  closeModal(){
    this.closeModalPopup.emit(false);
  }
  setImageOption(event){
    if (event.target.value==='Choose'){
      this.ChooseImage=true
    }
    else {
      this.ChooseImage=false
    }
  }

}
