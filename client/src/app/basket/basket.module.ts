import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BasketComponent } from './basket.component';
import localeVi from '@angular/common/locales/vi';
import { BasketRoutingModule } from './basket-routing.module';

registerLocaleData(localeVi, 'vi');

@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
})
export class BasketModule { }
