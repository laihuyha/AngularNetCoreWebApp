import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { SideBrandsFilterComponent } from '../core/side-brands-filter/side-brands-filter.component';
import { SideTypesFilterComponent } from '../core/side-types-filter/side-types-filter.component';
import { ShareModule } from '../share/share.module';
registerLocaleData(localeVi, 'vi');


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    SideBrandsFilterComponent,
    SideTypesFilterComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
  exports: [ShopComponent]
})
export class ShopModule { }
