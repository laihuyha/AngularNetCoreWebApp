import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Brand } from '../share/models/brands';
import { IPagination } from '../share/models/pagination';
import { IProduct } from '../share/models/product';
import { Type } from '../share/models/types';
import { ShopRequest } from '../share/RequestParam/shopRequest';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7102/api/';
  products = new Map<number, IProduct>();
  brands = new Map<number, Brand>();
  types = new Map<number, Type>();
  pagination?: IPagination<IProduct>;
  shopRequest = new ShopRequest();

  constructor(private http: HttpClient) { }

  getAllProducts() {
    let param = new HttpParams();
    if (this.shopRequest.brandId) {
      param = param.append('brandId', this.shopRequest.brandId.toString());
    }
    if (this.shopRequest.typeId) {
      param = param.append('typeId', this.shopRequest.typeId.toString());
    }
    if (this.shopRequest.sort) {
      param = param.append('sort', this.shopRequest.sort);
    }
    if (this.shopRequest.pageIndex) {
      param = param.append('pageIndex', this.shopRequest.pageIndex.toString());
    }
    if (this.shopRequest.pageSize) {
      param = param.append('pageSize', this.shopRequest.pageSize.toString());
    }
    if (this.shopRequest.searchText) {
      param = param.append('searchText', this.shopRequest.searchText);
    }

    var products = this.http.get<IPagination<IProduct>>(this.baseUrl + 'Products/all', { observe: 'response', params: param });
    return products.pipe(
      map(response => {
        response.body.data.forEach(product => {
          this.products.set(product.id, product);
        });
        this.pagination = response.body;
        return response.body;
      })
    );
  }

  setShopRequest(request: ShopRequest) {
    this.shopRequest = request;
  }

  getShopRequest() {
    return this.shopRequest;
  }

  getAllBrands() {
    const brands = this.brands.size > 0 ? of(Array.from(this.brands.values())) : this.http.get<Brand[]>(this.baseUrl + 'Products/brands');
    return brands;
  }

  getAllTypes() {
    const types = this.types.size > 0 ? of(Array.from(this.types.values())) : this.http.get<Type[]>(this.baseUrl + 'Products/types');
    return types;
  }

  getProduct(id: number) {
    const product = this.products.get(id);
    if (!product) {
      return this.http.get<IProduct>(this.baseUrl + 'Products/product/' + id);
    }
    return of(product);
  }
}
