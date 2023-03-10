import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js/types/stripe-js';
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
  @ViewChild('cardNumber') cardNumberElement: ElementRef;
  @ViewChild('expirationDate') expirationDateElement: ElementRef;
  @ViewChild('securityCode') securityCodeElement: ElementRef;

  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement
  expirationDate?: StripeCardExpiryElement
  securityCode?: StripeCardCvcElement

  cardErrors: cardErrors = new cardErrors();

  constructor(
    private basketServices: BasketService,
    private checkoutServices: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {
    loadStripe("pk_test_51MjjywBFz34eglKwhFzaUqWCKXz3O7I9iHy7EI1mdx25to4iG2ASp4pA6lqzG53wIhHTlO0Zfmm4jgnwCjSq3RfI00eGpFaVBX").then(stripe => {
      this.stripe = stripe;
      const elements = this.stripe.elements();
      if (elements) {

        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement.nativeElement);
        this.cardNumber.on('change', (event) => {
          if (event.error) {
            this.cardErrors.cardNumber = event.error.message;
          } else {
            this.cardErrors.reset('cardNumber');
          }
        });

        this.expirationDate = elements.create('cardExpiry');
        this.expirationDate.mount(this.expirationDateElement.nativeElement);
        this.expirationDate.on('change', (event) => {
          if (event.error) {
            this.cardErrors.expirationDate = event.error.message;
          } else {
            this.cardErrors.reset('expirationDate');
          }
        });

        this.securityCode = elements.create('cardCvc');
        this.securityCode.mount(this.securityCodeElement.nativeElement);
        this.securityCode.on('change', (event) => {
          if (event.error) {
            this.cardErrors.securityCode = event.error.message;
          } else {
            this.cardErrors.reset('securityCode');
          }
        });
      }
    });
  }

  submitOrder() {
    const cart = this.basketServices.getCurrentCart();
    if (!cart) return;
    const orderToCreate = this.getOrderToCreate(cart);
    if (!orderToCreate) return;
    this.checkoutServices.createOrder(orderToCreate).subscribe({
      next: (order) => {
        this.stripe?.confirmCardPayment(cart.clientSecret, {
          payment_method: {
            card: this.cardNumber,
            billing_details: {
              name: this.checkoutForm?.get('paymentForm')?.get('cardHolder')?.value,
            }
          }
        }).then((result) => {
          console.log(result);
          if (result.paymentIntent) {
            this.toastr.success('Order created successfully');
            this.basketServices.deleteCartLocal();
            const navigationExtras: NavigationExtras = { state: order };
            this.router.navigate(['checkout/success'], navigationExtras);
            console.log(order);
          }
        }, (error) => {
          this.toastr.error(error.message);
          console.log(error);
        });
      },
      error: (error) => {
        this.toastr.error(error.message);
        console.log(error);
      }
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

class cardErrors {
  cardNumber?: string = "";
  expirationDate?: string = "";
  securityCode?: string = "";

  reset(key: string) {
    this[key] = "";
  }
}
