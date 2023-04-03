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
  paginationCache = new Map();

  constructor(private http: HttpClient) { }

  getAllProducts(useCache = true) {
    if (!useCache) this.paginationCache = new Map();

    if (this.paginationCache.size > 0 && useCache) {
      if (this.paginationCache.has(Object.values(this.shopRequest).join('-'))) {
        this.pagination = this.paginationCache.get(Object.values(this.shopRequest).join('-'));
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();
    const { brandId, typeId, sort, pageIndex, pageSize, searchText } = this.shopRequest;
    const requestParams = { brandId, typeId, sort, pageIndex, pageSize, searchText };
    Object.entries(requestParams).forEach(([key, value]) => {
      if (value) params = params.append(key, value.toString());
    });

    const products = this.http.get<IPagination<IProduct>>(this.baseUrl + 'Products/all', { observe: 'response', params });
    return products.pipe(
      map(response => {
        this.paginationCache.set(Object.values(this.shopRequest).join('-'), response.body);
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
