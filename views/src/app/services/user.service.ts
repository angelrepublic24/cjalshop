import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser, User } from '../models/user';
import { Global } from './global';

@Injectable()
export class UserService{
    public url: string;
    public user: any;
    public cartItems = 0;

    constructor(private _http: HttpClient){
      this.url = Global.url
    }

    testService(){
      return 'Probando el servicio de Angular';
    }

    registerUser(user: User): Observable<any>{
      let params = JSON.stringify(user)
      let headers = new HttpHeaders().set('Content-Type', 'application/json')

      return this._http.post(this.url + 'signup', params, {headers: headers})
    }

    signInUser(user: LoginUser): Observable<any>{
      let params = JSON.stringify(user)
      let headers = new HttpHeaders().set('Content-Type', 'application/json')

      return this._http.post(this.url + 'login', params, {headers})
    }

    getProfile(){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this._http.get(this.url + 'getProfile', {headers})
    }
}

