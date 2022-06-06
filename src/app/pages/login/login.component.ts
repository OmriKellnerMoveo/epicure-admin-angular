import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''
  correctUserName: boolean = false

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let isLoggedIn:boolean=localStorage.getItem("userName")==='demo@skills.co.il';
    isLoggedIn && this.router.navigateByUrl('/restaurants');
  }
  logIn() {
    if (this.username === 'demo@skills.co.il') {
      localStorage.setItem("userName",'demo@skills.co.il')
      this.router.navigateByUrl('/restaurants').then();
      this.correctUserName=true
      this.successNotification()
    }
    else{
      this.tinyAlert()
    }
    this.correctUserName=false
  }
  register(){
    this.router.navigateByUrl('/register').then();
  }
  tinyAlert() {
    Swal.fire('Hi', `Unauthorized email address! try to insert 'demo@skills.co.il'` , 'error');

  }
  successNotification() {
    Swal.fire('Hi', 'Welcome to Epicure!', 'success');
  }
}
