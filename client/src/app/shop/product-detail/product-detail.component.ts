import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/share/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;
  quantity = 1;

  constructor(private _service: ShopService, private activeRoute: ActivatedRoute, private breadCrumbServices: BreadcrumbService, private cartServices: BasketService) {
    this.breadCrumbServices.set('@productDetail', ' ');
  }

  ngOnInit(): void {
    this.passingProductData();
  }

  addItemToCart() {
    this.cartServices.addToCart(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

  passingProductData() {
    this._service.getProduct(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(response => {
      this.product = response;
      this.breadCrumbServices.set('@productDetail', this.product.name);
    }, error => {
      console.log(error);
    });
  }
}
