import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../share/models/cart';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  cart$: Observable<ICart>;

  constructor(private cartServices: BasketService) { }

  ngOnInit(): void {
    this.cart$ = this.cartServices.cart$;
  }

}
