import { CommonModule, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SideBrandsFilterComponent } from '../core/side-brands-filter/side-brands-filter.component';
import { SideTypesFilterComponent } from '../core/side-types-filter/side-types-filter.component';
import { ShareModule } from '../share/share.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
registerLocaleData(localeVi, 'vi');


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    SideBrandsFilterComponent,
    SideTypesFilterComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    // RouterModule
    ShopRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
  // exports: [ShopComponent]
})
export class ShopModule { }
