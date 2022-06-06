
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['restaurant']).then(r => console.log(r)).catch(err=>console.log(err));
    }
  }
  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const response = await this.authService.login(email, password);
        const token = response.accessToken;
        this.authService.setToken(token);
        this.router.navigateByUrl('/restaurants').then();
        this.successNotification()
      } catch (error: any) {
        this.tinyAlert()
        console.log('error catch')
      }
    }
    else {
      this.tinyAlert()
      console.log('Form invalid')
    }
  }
  register() {
    this.router.navigateByUrl('/register').then();
  }
  successNotification() {
    Swal.fire('Hi', 'Welcome to Epicure!', 'success').then(r => console.log(r));
  }
  tinyAlert() {
    Swal.fire('Hi', `Unauthorized email address! try to insert 'demo@skills.co.il'`, 'error').then(r =>console.log(r)) ;
  }
}


























// import {Component, OnInit} from '@angular/core';
// import {Router} from '@angular/router';
// import Swal from 'sweetalert2';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   username: string = ''
//   password: string = ''
//   correctUserName: boolean = false
//
//   constructor(private router: Router) {
//   }
//
//   ngOnInit(): void {
//     let isLoggedIn:boolean=localStorage.getItem("userName")==='demo@skills.co.il';
//     isLoggedIn && this.router.navigateByUrl('/restaurants');
//   }
//   logIn() {
//     if (this.username === 'demo@skills.co.il') {
//       localStorage.setItem("userName",'demo@skills.co.il')
//       this.router.navigateByUrl('/restaurants').then();
//       this.correctUserName=true
//       this.successNotification()
//     }
//     else{
//       this.tinyAlert()
//     }
//     this.correctUserName=false
//   }
//   register(){
//     this.router.navigateByUrl('/register').then();
//   }
//   tinyAlert() {
//     Swal.fire('Hi', `Unauthorized email address! try to insert 'demo@skills.co.il'` , 'error');
//
//   }
//   successNotification() {
//     Swal.fire('Hi', 'Welcome to Epicure!', 'success');
//   }
// }
