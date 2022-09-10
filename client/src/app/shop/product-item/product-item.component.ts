import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/share/models/product';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  // baseUrl = 'https://localhost:7102/';

  @Input() product: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
