import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IAddress } from 'src/app/share/models/address';
import { ICart } from 'src/app/share/models/cart';
import { IOrderToCreate } from 'src/app/share/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private basketServices: BasketService,
    private checkoutServices: CheckoutService,
    private toastr: ToastrService,
    private accountServices: AccountService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  submitOrder() {
    const cart = this.basketServices.getCurrentCart();
    if (!cart) return;
    const orderToCreate = this.getOrderToCreate(cart);
    if (!orderToCreate) return;
    this.checkoutServices.createOrder(orderToCreate).subscribe({
      next: (order) => {
        this.toastr.success('Order created successfully');
        this.basketServices.deleteCartLocal();
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
        console.log(order);
      },
    });
  }
  private getOrderToCreate(cart: ICart) {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress: IAddress = this.checkoutForm?.get('addressForm')?.value as IAddress;
    if (!shipToAddress || !deliveryMethodId) return;
    let orderToCreate: IOrderToCreate = {
      cartId: cart.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    };
    return orderToCreate;
  }
}
