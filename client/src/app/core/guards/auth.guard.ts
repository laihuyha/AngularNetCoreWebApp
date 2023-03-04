import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountServices: AccountService, private router: Router, private toast: ToastrService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | Observable<boolean> {
    return this.accountServices.currentUser$.pipe(
      map(auth => {
        if (auth) return true;
        this.toast.info("You must login to continue checkout", "Unauthorized", { timeOut: 3000 }).onShown.subscribe(() => {
          this.router.navigate(['account/Login'], { queryParams: { returnUrl: state.url } });
        });
      })
    );
  }

}
