import { Component, OnInit } from '@angular/core';
import { Brand } from '../share/models/brands';
import { IProduct } from '../share/models/product';
import { Type } from '../share/models/types';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  productList: IProduct[];
  listBrands: Brand[];
  listTypes: Type[];
  selectedBrandId: number;
  selectedTypeId: number;
  pageIndex: number;
  pageSize: number;
  searchText: string;
  sort: string;

  constructor(private _shopServices: ShopService) { }

  ngOnInit(): void {
    if (this.pageIndex == null) {
      this.pageIndex = 1;
    }
    if (this.pageSize == null) {
      this.pageSize = 6;
    }
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  //#region Functions
  loadProducts() {
    this._shopServices.getAllProducts(this.selectedBrandId, this.selectedTypeId, this.sort, this.pageIndex, this.pageSize, this.searchText).subscribe(result => {
      console.log(result);
      this.productList = result.data;
    }, error => {
      console.log(error)
    });
  }

  loadBrands() {
    this._shopServices.getAllBrands().subscribe(result => {
      this.listBrands = [{ id: 0, name: 'All', isActive: 1 }, ...result];
      console.log(result);
    }, error => {
      console.log(error)
    });
  }

  loadTypes() {
    this._shopServices.getAllTypes().subscribe(result => {
      this.listTypes = [{ id: 0, name: 'All', isActive: 1 }, ...result];
      console.log(result);
    }, error => {
      console.log(error)
    });
  }

  onBrandSelected(brandId: number) {
    this.selectedBrandId = brandId;
    this.loadProducts();
  }

  onTypeSelected(typeId: number) {
    this.selectedTypeId = typeId;
    this.loadProducts();
  }
  //#endregion
}
