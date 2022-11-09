import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/share/models/product';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  // baseUrl = 'https://localhost:7102/';

  @Input() product: IProduct;

  constructor(private cartServices: BasketService) { }

  ngOnInit(): void {
  }

  addItemToCart() {
    // console.log("Clicked!");
    // console.log(this.product);
    this.cartServices.addToCart(this.product);
  }
}
