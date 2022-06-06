import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logOut(){
    this.router.navigateByUrl('/login').then(r => console.log(r)).catch(err=>console.log(err));
    localStorage.removeItem("token")
  }
  checkIfConnecting(){
    if (localStorage.getItem("token")!==undefined){
      return true
    }
    else
      return false
  }
}
