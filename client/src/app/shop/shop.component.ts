import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../share/models/brands';
import { IProduct } from '../share/models/product';
import { Type } from '../share/models/types';
import { ShopRequest } from '../share/RequestParam/ShopRequest';
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
  pageCount: number
  shopParams = new ShopRequest();
  textInput: string;
  constructor(private _shopServices: ShopService) { }

  ngOnInit(): void {
    if (this.shopParams.pageIndex == null) {
      this.shopParams.pageIndex = 1;
    }
    if (this.shopParams.pageSize == null) {
      this.shopParams.pageSize = 6;
    }
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  //#region Functions
  loadProducts() {
    this._shopServices.getAllProducts(this.shopParams).subscribe(result => {
      // console.log(result);
      this.productList = result.data; // Respone sẽ có data là 1 list sản phẩm, đưa nó vào biến productList để đem đi chỗ khác lặp
      this.shopParams.pageIndex = result.pageIndex;
      this.shopParams.pageSize = result.pageSize;
      this.count = result.count
      this.pageCount = result.pageCount
    }, error => {
      console.log(error)
    });
  }

  loadBrands() {
    this._shopServices.getAllBrands().subscribe(result => {
      this.listBrands = [{ id: 0, name: 'All', isActive: 1 }, ...result];
      // console.log(result);
    }, error => {
      console.log(error)
    });
  }

  loadTypes() {
    this._shopServices.getAllTypes().subscribe(result => {
      this.listTypes = [{ id: 0, name: 'All', isActive: 1 }, ...result];
      // console.log(result);
    }, error => {
      console.log(error)
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.loadProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.loadProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.loadProducts();
  }

  onPageChange(event: any) {
    // if (this.shopParams.pageIndex !== event) {
    //   this.shopParams.pageIndex = event.page
    //   this.shopParams.pageSize = event.itemsPerPage
    //   this.loadProducts();
    // }
    this.shopParams.pageIndex = event.page
    this.shopParams.pageSize = event.itemsPerPage
    this.loadProducts();
  }

  onSearch(text: string) {
    this.shopParams.searchText = text;
    // this.shopParams.searchText = this.searchText.nativeElement.value; => Cách này cũng được
    this.loadProducts();
  }
  onInputText(text: string) {
    this.textInput = text;
  }
  //#endregion
}
