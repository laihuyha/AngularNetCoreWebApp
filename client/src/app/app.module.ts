import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShopModule } from './shop/shop.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    // ShopModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
