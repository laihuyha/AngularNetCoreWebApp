import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Brand } from '../share/models/brands';
import { IPagination } from '../share/models/pagination';
import { Type } from '../share/models/types';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7102/api/';

  constructor(private http: HttpClient) { }

  getAllProducts(brandId?: number, typeId?: number, sort?: string, pageIndex?: number, pageSize?: number, searchText?: string) {
    let param = new HttpParams();
    if (brandId) {
      param = param.append('brandId', brandId.toString());
    }
    if (typeId) {
      param = param.append('typeId', typeId.toString());
    }
    if (sort) {
      param = param.append('sort', sort);
    }
    if (pageIndex) {
      param = param.append('pageIndex', pageIndex.toString());
    }
    if (pageSize) {
      param = param.append('pageSize', pageSize.toString());
    }
    if (searchText) {
      param = param.append('searchText', searchText);
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
}
