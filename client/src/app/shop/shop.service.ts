import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../share/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7102/api/';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<IPagination>(this.baseUrl + 'Products/all?pageIndex=1&pageSize=9');
  }
}
