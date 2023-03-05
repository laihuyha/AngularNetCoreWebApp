import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeliveryMethod } from '../share/models/delivery';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getdeliveryMethods() {
    let token = localStorage.getItem('token');
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);
    if (token === null) {
      return;
    }
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'order/getDeliveryMethods').pipe(
      map(s => {
        return s.sort((a, b) => b.cost - a.cost);
      })
    );
  }
}
