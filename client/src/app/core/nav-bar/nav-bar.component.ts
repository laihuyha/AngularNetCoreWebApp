import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { ICart } from 'src/app/share/models/cart';
import { IUser } from 'src/app/share/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  cart$: Observable<ICart>;
  currentUser$: Observable<IUser>;
  constructor(private cartServices: BasketService, private accountServices: AccountService) { }

  ngOnInit(): void {
    this.cart$ = this.cartServices.cart$;
    this.currentUser$ = this.accountServices.currentUser$;
  }

  logout = () => {
    this.accountServices.logout();
  }
}
