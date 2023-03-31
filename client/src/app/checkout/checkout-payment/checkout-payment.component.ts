import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js/types/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IAddress } from 'src/app/share/models/address';
import { ICart } from 'src/app/share/models/cart';
import { IOrderToCreate } from 'src/app/share/models/order';
import { environment } from 'src/environments/environment';
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

  /// Validation
  cardErrors: cardErrors = new cardErrors();
  cardNumberValid: boolean = false;
  expirationDateValid: boolean = false;
  securityCodeValid: boolean = false;

  loading: boolean = false;

  constructor(
    private basketServices: BasketService,
    private checkoutServices: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {
    loadStripe(environment.Stripe.PublishableKey).then(stripe => {
      this.stripe = stripe;
      const elements = this.stripe.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement.nativeElement);
        this.cardNumber.on('change', (event) => {
          this.cardNumberValid = event.complete;
          if (event.error) {
            this.cardErrors.cardNumber = event.error.message;
          } else {
            this.cardErrors.reset('cardNumber');
          }
        });

        this.expirationDate = elements.create('cardExpiry');
        this.expirationDate.mount(this.expirationDateElement.nativeElement);
        this.expirationDate.on('change', (event) => {
          this.expirationDateValid = event.complete;
          if (event.error) {
            this.cardErrors.expirationDate = event.error.message;
          } else {
            this.cardErrors.reset('expirationDate');
          }
        });

        this.securityCode = elements.create('cardCvc');
        this.securityCode.mount(this.securityCodeElement.nativeElement);
        this.securityCode.on('change', (event) => {
          this.securityCodeValid = event.complete;
          if (event.error) {
            this.cardErrors.securityCode = event.error.message;
          } else {
            this.cardErrors.reset('securityCode');
          }
        });
      }
    });
  }

  async submitOrder() {
    this.loading = true;
    const cart = this.basketServices.getCurrentCart();

    try {
      const createdOrder = await this.createOrder(cart);
      const paymentResult = await this.confirmPaymentWithStripe(cart);
      if (paymentResult.paymentIntent) {
        this.basketServices.deleteCart(cart);
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message)
      }
    } catch (error) {
      console.log(error);
      this.toastr.error(error.message);
    }
    finally {
      this.loading = false;
    }
  }
  private async confirmPaymentWithStripe(cart: ICart) {
    if (!cart) throw new Error("Cart is null");
    const result = this.stripe?.confirmCardPayment(cart.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('cardHolder')?.value,
        }
      }
    })

    if (!result) throw new Error("Problem with payment");
    return result;
  }
  private async createOrder(cart: ICart) {

    if (!cart) throw new Error("Cart is null");

    const orderToCreate = this.getOrderToCreate(cart);
    return firstValueFrom(this.checkoutServices.createOrder(orderToCreate))
  }
  private getOrderToCreate(cart: ICart): IOrderToCreate {

    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress: IAddress = this.checkoutForm?.get('addressForm')?.value as IAddress;

    if (!shipToAddress || !deliveryMethodId) throw new Error("ShipToAddress or DeliveryMethodId is null");

    let orderToCreate: IOrderToCreate = {
      cartId: cart.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    };
    return orderToCreate;
  }

  get cardValid() {
    // console.log(this.checkoutForm?.get('paymentForm'));
    return this.checkoutForm?.get('paymentForm')?.valid && this.cardNumberValid && this.expirationDateValid && this.securityCodeValid;
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
