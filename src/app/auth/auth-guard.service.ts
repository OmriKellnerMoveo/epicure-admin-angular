import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import Swal from "sweetalert2";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  users:User[]
  constructor(private http: HttpClient, public router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem("token"))  {
      this.tinyAlert()
      this.router.navigateByUrl('/login').then(res=>console.log(res)).catch(err=>console.log(err))
      return false;
    }
    return true;
  }
  tinyAlert() {
    Swal.fire('Hi', `You are not allowed to view this page` , 'error');
  }
}
