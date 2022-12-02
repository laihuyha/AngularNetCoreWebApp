import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartItem } from '../share/models/cart';
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

  removeCartItem(item: ICartItem) {
    this.cartServices.removeFromCart(item);
  }

  incrementItemQuantity(item: ICartItem) {
    this.cartServices.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: ICartItem) {
    this.cartServices.decrementItemQuantity(item);
  }

  deleteCart(cart: ICart) {
    this.cartServices.deleteCart(cart);
  }
}
