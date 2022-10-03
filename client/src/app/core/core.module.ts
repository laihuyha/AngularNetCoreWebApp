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
      preventDuplicates: true,
      closeButton: true,
      
    })
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }
