import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private cartServices: BasketService, private accountServices: AccountService) {
  }

  ngOnInit(): void {
    this.loadUserCart();
    this.loadCurrentUSer();
  }

  loadUserCart = () => {
    const cartId = localStorage.getItem('cart_id');
    if (cartId) {
      this.cartServices.getCart(cartId).subscribe(() => {
      }, error => {
        console.log(error);
      });
    }
  }

  loadCurrentUSer = () => {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountServices.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
    }
  }
}
