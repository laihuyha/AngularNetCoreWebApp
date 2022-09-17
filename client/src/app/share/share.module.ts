import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponentComponent } from './components/pager-component/pager-component.component';


@NgModule({
  declarations: [
    PagerComponentComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagerComponentComponent
  ]
})
export class ShareModule { }
