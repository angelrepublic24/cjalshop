import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../../models/user';
import {FormControl, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

//component specifc details
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

//exporting Login Component
export class LoginComponent implements OnInit {
  public title: string;
  public user: LoginUser;
  message: string;

  constructor(private _userService: UserService, private router: Router) {
    this.user = new LoginUser('', '');

  }

  ngOnInit() {}


  signIn(form){
    this._userService.signInUser(this.user).subscribe(
      response => {
        if(response.user){
          this.message = 'success';
          console.log('Inicio de sesion exitosa');
          this.router.navigate(['/'])
        }else{
          this.message = 'failed';
        }
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  // validate() {
  //   if (this.email) {
  //     if (this.password) {
  //       return true;
  //     } else {
  //       this.data.error('Password is not entered');
  //     }
  //   } else {
  //     this.data.error('Email is not entered.');
  //   }
  // }

  // async login() {
  //   this.btnDisabled = true;
  //   try {
  //     if (this.validate()) {
  //       this._userService.signInUser(this.email, this.password).subscribe()
  //       if (this.data['success']) {
  //         localStorage.setItem('token', this.data['token']);
  //         await this.data.getProfile();
  //         this.router.navigate(['/']);
  //       } else {
  //         this.data.error(this.data['message']);
  //       }
  //     }
  //   } catch (error) {
  //     this.data.error(error['message']);
  //   }
  //   this.btnDisabled = false;
  // }
}
