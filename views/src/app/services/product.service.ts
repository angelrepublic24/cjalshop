import { Products } from './../models/products';
import { Global } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService{
  public url: string;

  constructor(private _http: HttpClient){
    this.url = Global.url
  }

  createProduct(products: Products){
    let params = JSON.stringify(products)
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');

    return this._http.post(this.url + 'create-product', params, {headers: headers})
  }

  getProducts():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.get(this.url + 'getAllProduct', {headers: headers})
  }


}
