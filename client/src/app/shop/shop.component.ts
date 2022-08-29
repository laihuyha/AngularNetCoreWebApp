import { Component, OnInit } from '@angular/core';
import { IProduct } from '../share/models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  productList: IProduct[];

  constructor(private _shopServices: ShopService) { }

  ngOnInit(): void {
    this._shopServices.getAllProducts().subscribe(result => {
      this.productList = result.data;
    }, error => {
      console.log(error)
    });
  }

}
