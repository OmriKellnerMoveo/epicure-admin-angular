import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import Swal from "sweetalert2";
import {map} from "rxjs/operators";
import {Chef} from "../models/chefs.model";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  users:User[]
  constructor(private http: HttpClient, public router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem("userName")!=='demo@skills.co.il')  {
      this.tinyAlert()
      this.router.navigateByUrl('/login').then(res=>console.log(res)).catch(err=>console.log(err))
      return false;
    }
    return true;
  }
  tinyAlert() {
    Swal.fire('Hi', `You are not allowed to view this page` , 'error');
  }
  // login(email: string, password: string): Promise<any> {
  //   return firstValueFrom(
  //       this.http.post<any>('http://localhost:9000/api/v1/login', {
  //         email,
  //         password,
  //       })
  //   );
  // }
}
