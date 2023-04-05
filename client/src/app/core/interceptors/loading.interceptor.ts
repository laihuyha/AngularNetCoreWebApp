import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize, identity, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BusyService } from "../services/busy.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private busyService: BusyService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('emailexists') || req.method === 'POST' && req.url.includes('orders')) {
            return next.handle(req);
        }
        this.busyService.busy();
        return next.handle(req).pipe(
            (environment.production ? identity : delay(2000)),
            finalize(() => {
                this.busyService.idle();
            })
        );
    }
}