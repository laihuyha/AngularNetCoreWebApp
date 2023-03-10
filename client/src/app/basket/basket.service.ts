import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, ICart, ICartItem, ICartTotal } from '../share/models/cart';
import { DeliveryMethod } from '../share/models/delivery';
import { IProduct } from '../share/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<ICart>(null);
  cart$ = this.cartSource.asObservable();
  private cartTotalSource = new BehaviorSubject<ICartTotal>(null);
  basketTotal$ = this.cartTotalSource.asObservable();

  constructor(private client: HttpClient) { }

  createPaymentIntent() {
    return this.client.post(this.baseUrl + 'payment/' + this.getCurrentCart().id, {})
      .pipe(
        map((basket) => {
          this.cartSource.next(basket as ICart);
        })
      )
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    const basket = this.getCurrentCart();
    basket.shippingCost = deliveryMethod.cost;
    if (basket) {
      basket.deliveryMethodId = deliveryMethod.id;
      this.setCart(basket);
    }
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
          this.CalculateTotals();

          // console.log(this.getCurrentCart());
        })
      );
  }

  setCart(cart: ICart) {
    cart.items.forEach(item => {
      item.brand = JSON.stringify(item.brand);
      item.type = JSON.stringify(item.type);
    });
    return this.client.post(this.baseUrl + 'Cart', cart).subscribe((response: ICart) => {
      // console.log(response);
      this.cartSource.next(response);
      this.CalculateTotals();
    }, error => {
      console.log(error);
    });
  }

  getCurrentCart() {
    let cart = this.cartSource.value;
    if (cart) {
      cart.items.forEach(item => {
        // console.log(item);
        if (typeof item.brand === 'string') {
          item.brand = JSON.parse(item.brand);
        }
        if (typeof item.type === 'string') {
          item.type = JSON.parse(item.type);
        }
      });
    }
    return cart;
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

  incrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCart();
    const foundItemIndex = cart.items.findIndex(x => x.id === item.id);
    cart.items[foundItemIndex].quantity++;
    this.setCart(cart);
  }

  decrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCart();
    const foundItemIndex = cart.items.findIndex(x => x.id === item.id);
    if (foundItemIndex != 1 && cart.items[foundItemIndex].quantity > 1) {
      cart.items[foundItemIndex].quantity--;
      this.setCart(cart);
    } else {
      this.removeFromCart(item);
    }
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

  removeFromCart(item: ICartItem) {
    const cart = this.getCurrentCart();
    if (cart.items.some(x => x.id === item.id)) {
      cart.items = cart.items.filter(i => i.id !== item.id);
      if (cart.items.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }
  }

  deleteCart(cart: ICart) {
    return this.client.delete(this.baseUrl + 'Cart?id=' + cart.id).subscribe(() => {
      this.deleteCartLocal();
    }, error => {
      console.log(error);
    });
  }

  deleteCartLocal() {
    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('cart_id');
  }
  //Total
  private CalculateTotals() {
    const cart = this.getCurrentCart();

    // a is return value, b is current value, 0 is default value of a
    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = cart.shippingCost + subtotal;
    this.cartTotalSource.next({ shipping: cart.shippingCost, subtotal, total });
  }
}
