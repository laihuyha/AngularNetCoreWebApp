import { Component, OnInit } from '@angular/core';
import { Brand } from '../share/models/brands';
import { IProduct } from '../share/models/product';
import { Type } from '../share/models/types';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  productList: IProduct[];
  listBrands: Brand[];
  listTypes: Type[]

  constructor(private _shopServices: ShopService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  //#region Functions
  loadProducts() {
    this._shopServices.getAllProducts().subscribe(result => {
      console.log(result);
      this.productList = result.data;
    }, error => {
      console.log(error)
    });
  }

  loadBrands() {
    this._shopServices.getAllBrands().subscribe(result => {
      this.listBrands = result;
      console.log(result);
    }, error => {
      console.log(error)
    });
  }

  loadTypes() {
    this._shopServices.getAllTypes().subscribe(result => {
      this.listTypes = result;
      console.log(result);
    }, error => {
      console.log(error)
    });
  }
  //#endregion
}
