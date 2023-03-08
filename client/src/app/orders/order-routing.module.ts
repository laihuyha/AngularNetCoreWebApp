import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: ':id', component: OrderDetailedComponent, data: { breadcrumb: { alias: 'OrderDetailed' } } }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
