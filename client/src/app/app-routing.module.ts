import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TesterrorComponent } from './core/testerror/testerror.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'test-error', component: TesterrorComponent, data: { breadcrumb: 'Test Errors' } },
  { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } },
  { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } },
  {
    path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule), data: { breadcrumb: 'Shop' }
  }, // This mean lazy loading
  // { path: 'shop/:id', component: ProductDetailComponent },
  {
    path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule), data: { breadcrumb: 'Cart' }
  },
  {
    path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule), data: { breadcrumb: 'Checkout' }
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
