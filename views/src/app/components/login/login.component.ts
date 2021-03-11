import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../../models/user';
import {FormControl, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service'

//component specifc details
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, DataService]
})

//exporting Login Component
export class LoginComponent implements OnInit {
  public title: string;
  public user: LoginUser;
  message: string;

  constructor(private _userService: UserService, private data: DataService, private router: Router) {
    this.user = new LoginUser('', '');

  }

  ngOnInit() {}

  signIn(form){
     this._userService.signInUser(this.user).subscribe(
     async response => {
          if(response.user){
            this.message = 'success';
            console.log('Inicio de sesion exitosa');
            localStorage.setItem('token', this.data['token']);
            await this._userService.getProfile();
            this.router.navigate(['/'])
          }
      },
      error =>{
        console.log(<any>error)
      }
    )
  }
}
