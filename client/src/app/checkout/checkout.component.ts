import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IAddress } from '../share/models/address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private fb: FormBuilder, private accountServices: AccountService, private basketServices: BasketService) { }

  ngOnInit(): void {
    this.getAddress();
    this.getDeliveryMethods();
  }

  getAddress() {
    this.accountServices.getCurrentUserAddress().subscribe({
      next: (address: IAddress) => {
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    })
  }

  getDeliveryMethods() {
    const basket = this.basketServices.getCurrentCart();
    if (basket && basket.deliveryMethodId) {
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.patchValue(basket.deliveryMethodId.toString());
    }
  }

  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    }),

    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required],
    }),

    paymentForm: this.fb.group({
      cardHolder: ['', Validators.required],
    })

  });
}
