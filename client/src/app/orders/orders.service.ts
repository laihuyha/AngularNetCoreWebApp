import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getListOrders() {
    return this.http.get(this.baseUrl + 'order/getordersforuser');
  }
  getOrder(id: number) {
    return this.http.get(this.baseUrl + 'order/' + id);
  }
}
