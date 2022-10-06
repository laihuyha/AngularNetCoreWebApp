import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TesterrorComponent } from './testerror/testerror.component';



@NgModule({
  declarations: [NavBarComponent, TesterrorComponent, NotFoundComponent, ServerErrorComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      timeOut: 2000,
      easing: 'ease-in-out',
      easeTime: 1000,
      progressBar: true,
      progressAnimation: 'decreasing',
      // enableHtml: true,
      newestOnTop: true,
    }),
    BreadcrumbModule
  ],
  exports: [NavBarComponent, SectionHeaderComponent]
})
export class CoreModule { }
