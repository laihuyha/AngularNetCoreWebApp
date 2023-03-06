import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { IAddress } from '../share/models/address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private fb: FormBuilder, private accountServices: AccountService) { }

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress() {
    this.accountServices.getCurrentUserAddress().subscribe({
      next: (address: IAddress) => {
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    })
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
      cardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.required],
      zipCode: ['', Validators.required],
    })

  });
}
