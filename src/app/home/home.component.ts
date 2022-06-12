import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocalMode} from "../services/global-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }
assetsPathLogo:string
  ngOnInit(): void {
    if (LocalMode){
      this.assetsPathLogo="../../assets"
    }else {
      this.assetsPathLogo="./assets"
    }
  }
  logOut(){
    this.router.navigateByUrl('/login').then(r => console.log(r)).catch(err=>console.log(err));
    localStorage.removeItem("token")
  }
  checkIfConnecting(){
    if (localStorage.getItem("token")!==undefined && localStorage.getItem("token")!==null){
      console.log('connecting')
      return true
    }
    else
      console.log('not connecting')
    return false
  }
}
