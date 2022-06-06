import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  message:"Register Page"
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['restaurant']).then(res=>console.log(res)).catch(err=>console.log(err));
    }
  }
  async onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      try {
        await this.authService.register(email, password);
        this.router.navigate(['login']).then(res=>console.log(res)).catch(err=>console.log(err));
        this.successNotification()

      } catch (error: any) {
        console.log(error);
        alert(error.error.error.name);
      }
    }
    else {
      this.tinyAlert()
    }
  }
  onBack() {
    this.router.navigate(['login']).then(res=>console.log(res)).catch(err=>console.log(err));
  }
  successNotification() {
    Swal.fire('Hi', 'User registered successfully!', 'success').then(r => console.log(r)).catch(err=>console.log(err));
  }
  tinyAlert() {
    Swal.fire('Error', `Invalid details! ,please try again`, 'error').then(r =>console.log(r)).catch(err=>console.log(err));
  }
}
