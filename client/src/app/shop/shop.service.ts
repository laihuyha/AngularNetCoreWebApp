import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Brand } from '../share/models/brands';
import { IPagination } from '../share/models/pagination';
import { IProduct } from '../share/models/product';
import { Type } from '../share/models/types';
import { ShopRequest } from '../share/RequestParam/ShopRequest';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7102/api/';

  constructor(private http: HttpClient) { }

  getAllProducts(request: ShopRequest) {
    let param = new HttpParams();
    if (request.brandId) {
      param = param.append('brandId', request.brandId.toString());
    }
    if (request.typeId) {
      param = param.append('typeId', request.typeId.toString());
    }
    if (request.sort) {
      param = param.append('sort', request.sort);
    }
    if (request.pageIndex) {
      param = param.append('pageIndex', request.pageIndex.toString());
    }
    if (request.pageSize) {
      param = param.append('pageSize', request.pageSize.toString());
    }
    if (request.searchText) {
      param = param.append('searchText', request.searchText);
    }

    var products = this.http.get<IPagination>(this.baseUrl + 'Products/all', { observe: 'response', params: param });
    return products.pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getAllBrands() {
    var brands = this.http.get<Brand[]>(this.baseUrl + 'Products/brands');
    return brands;
  }

  getAllTypes() {
    var types = this.http.get<Type[]>(this.baseUrl + 'Products/types');
    return types;
  }

  getProduct(id: number) {
    var product = this.http.get<IProduct>(this.baseUrl + 'Products/product/' + id);
    return product;
  }
}
