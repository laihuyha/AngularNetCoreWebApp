import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { ICartTotal } from '../../models/cart';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  cartTotal$: Observable<ICartTotal>;
  constructor(private cartServices : BasketService) { }

  ngOnInit(): void {
    this.cartTotal$ = this.cartServices.basketTotal$;
  }

}
