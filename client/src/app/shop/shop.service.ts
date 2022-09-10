import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../share/models/brands';
import { IPagination } from '../share/models/pagination';
import { Type } from '../share/models/types';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7102/api/';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    var products = this.http.get<IPagination>(this.baseUrl + 'Products/all?pageIndex=1&pageSize=9');
    return products;
  }

  getAllBrands() {
    var brands = this.http.get<Brand[]>(this.baseUrl + 'Products/brands');
    return brands;
  }

  getAllTypes() {
    var types = this.http.get<Type[]>(this.baseUrl + 'Products/types');
    return types;
  }
}
