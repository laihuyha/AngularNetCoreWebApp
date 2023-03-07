import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { DeliveryMethod } from 'src/app/share/models/delivery';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(private checkoutServices: CheckoutService, private basketService: BasketService) {

  }

  ngOnInit(): void {
    // this.checkoutServices.getdeliveryMethods().subscribe((dm: DeliveryMethod[]) => {
    //   this.deliveryMethods = dm;
    // }, error => {
    //   console.log(error);
    // });

    this.checkoutServices.getdeliveryMethods().subscribe({
      next: (dm: DeliveryMethod[]) => this.deliveryMethods = dm,
    });
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
