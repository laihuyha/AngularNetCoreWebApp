import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Brand } from '../share/models/brands';
import { IPagination } from '../share/models/pagination';
import { IProduct } from '../share/models/product';
import { Type } from '../share/models/types';
import { ShopRequest } from '../share/RequestParam/shopRequest';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  pagination?: IPagination<IProduct>;
  shopParams = new ShopRequest();
  productCache = new Map<string, IPagination<IProduct>>();

  constructor(private http: HttpClient) { }

  getAllProducts(useCache = true): Observable<IPagination<IProduct>> {

    if (!useCache) this.productCache = new Map();

    console.log('productCache', this.productCache)
    
    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();
    const { brandId, typeId, sort, pageIndex, pageSize, searchText } = this.shopParams;
    const requestParams = { brandId, typeId, sort, pageIndex, pageSize, searchText };
    Object.entries(requestParams).forEach(([key, value]) => {
      if (value) params = params.append(key, value.toString());
    });


    return this.http.get<IPagination<IProduct>>(this.baseUrl + 'products/all', { params }).pipe(
      map(response => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response)
        this.pagination = response;
        return response;
      })
    )
  }

  setShopRequest(params: ShopRequest) {
    this.shopParams = params;
  }

  getShopRequest() {
    return this.shopParams;
  }

  getProduct(id: number) {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return { ...acc, ...paginatedResult.data.find(x => x.id === id) }
      }, {} as IProduct)

    if (Object.keys(product).length !== 0) return of(product);

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getAllBrands() {
    if (this.brands.length > 0) return of(this.brands);

    return this.http.get<Brand[]>(this.baseUrl + 'products/brands').pipe(
      map(brands => this.brands = brands)
    );
  }

  getAllTypes() {
    if (this.types.length > 0) return of(this.types);

    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
  }
}
