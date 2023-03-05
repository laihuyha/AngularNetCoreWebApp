import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { ICartItem } from '../../models/cart';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() addItem = new EventEmitter<ICartItem>();
  @Output() decreaseItemQuantity = new EventEmitter<ICartItem>();
  @Output() removeItem = new EventEmitter<ICartItem>();
  @Input() isBasket = true;

  constructor(public cartService: BasketService) { }

  ngOnInit(): void {
  }

  increaseCartItemQuantity(item: ICartItem) {
    this.addItem.emit(item);
  }

  decreaseCartItemQuantity(item: ICartItem) {
    this.decreaseItemQuantity.emit(item);
  }

  removeItemFromCart(item: ICartItem) {
    this.removeItem.emit(item);
  }
}
