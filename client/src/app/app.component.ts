import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private cartServices: BasketService) {
  }

  ngOnInit(): void {
    const cartId = localStorage.getItem('cart_id');
    // console.log(cartId);
    if (cartId) {
      this.cartServices.getCart(cartId).subscribe(() => {
        // console.log('initialization cart');
      }, error => {
        console.log(error);
      });
    }
  }
}
