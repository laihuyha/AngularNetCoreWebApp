import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../share/models/brands';
import { IProduct } from '../share/models/product';
import { Type } from '../share/models/types';
import { ShopRequest } from '../share/RequestParam/shopRequest';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('searchText', { static: true }) searchText: ElementRef;

  productList: IProduct[];
  listBrands: Brand[];
  listTypes: Type[];
  count: number;
  pageCount: number;
  textInput: string;
  shopParams = this._shopServices.getShopRequest();

  constructor(private _shopServices: ShopService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  //#region Functions
  loadProducts() {
    this._shopServices.getAllProducts().subscribe(
      (result) => {
        this.productList = result.data;
        this.count = result.count;
        this.pageCount = result.pageCount;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBrands() {
    this._shopServices.getAllBrands().subscribe(
      (result) => {
        this.listBrands = [{ id: 0, name: 'All', isActive: 1 }, ...result];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadTypes() {
    this._shopServices.getAllTypes().subscribe(
      (result) => {
        this.listTypes = [{ id: 0, name: 'All', isActive: 1 }, ...result];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this._shopServices.setShopRequest(this.shopParams);
    this.loadProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this._shopServices.setShopRequest(this.shopParams);
    this.loadProducts();
  }

  onSortSelected(sort: string) {
    const params = this._shopServices.getShopRequest();
    params.sort = sort;
    this._shopServices.setShopRequest(params);
    this.shopParams = { ...this.shopParams, ...params }
    this.loadProducts();
  }

  onPageChange(event: any) {
    const params = this._shopServices.getShopRequest();
    params.pageIndex = event.page
    params.pageSize = event.itemsPerPage
    this._shopServices.setShopRequest(params);
    this.shopParams = { ...this.shopParams, ...params }
    this.loadProducts();
  }

  onSearch(text: string) {
    const params = this._shopServices.getShopRequest();
    params.searchText = text;
    this._shopServices.setShopRequest(params);
    this.shopParams = { ...this.shopParams, ...params }
    this.loadProducts();
  }

  onReset() {
    if (this.searchText.nativeElement.value) {
      this.searchText.nativeElement.value = '';
    }
    this.shopParams = new ShopRequest();
    this._shopServices.setShopRequest(this.shopParams);
    this.loadProducts();
  }

  onInputText(text: string) {
    this.textInput = text;
  }
  //#endregion
}
