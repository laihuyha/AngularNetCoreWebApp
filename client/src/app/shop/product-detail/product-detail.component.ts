import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/share/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;

  constructor(private _service: ShopService, private activeRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.passingProductData();
  }

  passingProductData() {
    this._service.getProduct(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(response => {
      this.product = response;
    }, error => {
      console.log(error);
    });
  }
}
