import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper?: CdkStepper;

  constructor(private basketServices: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  createPaymentIntent() {
    this.basketServices.createPaymentIntent().subscribe({
      next: (response: any) => {
        this.toastr.success('Payment intent created');
        this.appStepper.next();
      },
      error: (error: any) => {
        this.toastr.error(error.message);
      },
    })
  }
}
