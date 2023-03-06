import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {

  @Input() checkoutForm: FormGroup;

  constructor(private accountServices: AccountService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress() {
    this.accountServices.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe({
      next: (address: any) => {
        this.checkoutForm.get('addressForm').setValue(address);
        // this.checkoutForm.get('addressForm').reset(address);
        this.toast.success('Address saved');
      }
    });
  }
}
