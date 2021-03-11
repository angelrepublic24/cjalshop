import { Products } from './../../models/products';
import { ProductService } from './../../services/product.service';
import { Global } from './../../services/global';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService]
})
export class HomeComponent implements OnInit {
  public products: Products[];
  public url: string;

  constructor(private _productService: ProductService) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts().subscribe(
      response =>{
        if(response.products){
          this.products = response.products
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

}
