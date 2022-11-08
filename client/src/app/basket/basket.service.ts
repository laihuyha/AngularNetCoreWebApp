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

  getCart(id: string) {
    return this.client.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((cart: ICart) => {
          this.cartSource.next(cart);
        })
      );
  }

  setCart(cart: ICart) {
    return this.client.post(this.baseUrl + 'basket', cart).subscribe((response: ICart) => {
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
    const index = cart.items.findIndex(x => x.id === itemToAdd.id);
    if (index === -1) {
      cart.items.push(itemToAdd);
    } else {
      cart.items[index].quantity++;
    }
  }
  private createCart(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
  private mapProductItemToCart(item: IProduct, quantity: number): ICartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.imageUrl,
      brand: item.brandId.toString(),
      type: item.typeId.toString()
    }
  }

  removeFromCart(item: any) {

  }
}
