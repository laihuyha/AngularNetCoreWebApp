import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBrandsFilterComponent } from './side-brands-filter/side-brands-filter.component';
import { SideTypesFilterComponent } from './side-types-filter/side-types-filter.component';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }
