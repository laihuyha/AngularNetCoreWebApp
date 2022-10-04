import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TesterrorComponent } from './testerror/testerror.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [NavBarComponent, TesterrorComponent, NotFoundComponent, ServerErrorComponent],
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
    })
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }
