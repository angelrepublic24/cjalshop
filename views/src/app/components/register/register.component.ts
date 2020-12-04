import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {Country} from '@angular-material-extensions/select-country'; 
import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


//component specific details
@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

//exporting Registration component for reuse 
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  email = new FormControl('', [Validators.required, Validators.email]);
  public status: string;
  countryFormControl = new FormControl();
  countryFormGroup: FormGroup;

  constructor(private _userService: UserService, private formBuilder: FormBuilder) {
    this.title = "Crear Usuario";
    this.user = new User('', '', '', '', '', null, '', '', null, '', '');
   }

  ngOnInit(): void {
    this.countryFormGroup = this.formBuilder.group({
      country: []
    });
    
    this.countryFormGroup.get('country').valueChanges
    .subscribe(country => console
    .log('this.countryFormGroup.get("country").valueChanges', country));
 
    this.countryFormControl.valueChanges
    .subscribe(country => console
    .log('this.countryFormControl.valueChanges', country));
  }
 
 
  onCountrySelected($event: Country) {
    console.log($event);
    }
  
  onSubmit(form){
    console.log(this.user)
    this._userService.createUser(this.user).subscribe(
      response => {
        if(response.user){
          this.status = 'success'
          form.reset()
        }else{
          this.status = 'failed'
        }
      },
      error => {
        console.log(<any>error)
      }
    )
  }
  matcher = new MyErrorStateMatcher();

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

}