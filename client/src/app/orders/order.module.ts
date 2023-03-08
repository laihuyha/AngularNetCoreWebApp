import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { ShareModule } from '../share/share.module';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailedComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule
  ]
})
export class OrderModule { }
