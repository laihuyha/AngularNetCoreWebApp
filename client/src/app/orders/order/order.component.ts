import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/share/models/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  listOrders: IOrder[] = [];

  constructor(private orderServices: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderServices.getListOrders().subscribe({
      next: (orders: IOrder[]) => {
        this.listOrders = orders;
      }
    })
  }
}
