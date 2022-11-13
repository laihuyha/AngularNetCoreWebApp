import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, ICart, ICartItem } from '../share/models/cart';
import { IProduct } from '../share/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<ICart>(null);
  cart$ = this.cartSource.asObservable();

  constructor(private client: HttpClient) { }

  // Comming soon need AuthController
  getCurrentUserName() {
    // return this.client.get(this.baseUrl + 'account').subscribe((response: any) => { }, error => {
    //   console.log(error);
    // });
  }

  getCart(id: string) {
    return this.client.get(this.baseUrl + 'Cart?id=' + id)
      .pipe(
        map((cart: ICart) => {
          cart.items.forEach(item => {
            item.brand = JSON.parse(item.brand);
            item.type = JSON.parse(item.type);
          });
          this.cartSource.next(cart);
          console.log(this.getCurrentCart());
        })
      );
  }

  setCart(cart: ICart) {
    return this.client.post(this.baseUrl + 'Cart', cart).subscribe((response: ICart) => {
      console.log(response);
      this.cartSource.next(response);
    }, error => {
      console.log(error);
    });
  }

  getCurrentCart() {
    return this.cartSource.value;
  }

  addToCart(item: IProduct, quantity = 1) {
    const itemToAdd: ICartItem = this.mapProductItemToCart(item, quantity);
    const cart = this.getCurrentCart() ?? this.createCart();
    // cart.items.push(itemToAdd);
    // console.log(cart);
    const index = cart.items.findIndex(x => x.id === itemToAdd.id);
    if (index === -1) {
      cart.items.push(itemToAdd);
    } else {
      cart.items[index].quantity++;
    }
    this.setCart(cart);
  }
  private createCart(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    // this.cartSource.next(cart);
    return cart;
  }
  private mapProductItemToCart(item: IProduct, quantity: number): ICartItem {
    // console.log(item);
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.imageUrl,
      brand: JSON.stringify(item.brand),
      type: JSON.stringify(item.type)
    }
  }

  removeFromCart(item: any) {

  }
}
