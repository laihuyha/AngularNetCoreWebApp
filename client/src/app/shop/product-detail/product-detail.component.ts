import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private _service: ShopService, private activeRoute: ActivatedRoute, private breadCrumbServices: BreadcrumbService) {
    this.breadCrumbServices.set('@productDetail', ' ');
  }

  ngOnInit(): void {
    this.passingProductData();
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
