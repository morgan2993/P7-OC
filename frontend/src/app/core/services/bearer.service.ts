import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable, iif } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class BearerService implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!!localStorage.getItem("currentUser")) {
			return this.auth.store.pipe(
				concatMap(data => {
					const currentUser = JSON.parse(localStorage.getItem("currentUser"));
					const headers = req.headers.set('Authorization', `Bearer ${ currentUser.token }`);
					const authReq = req.clone({ headers });
					return next.handle(authReq);
				})
			);
		} else {
			return next.handle(req);
		}
	}

	/*intercept(req: HttpRequest<any>,
		next: HttpHandler): Observable<HttpEvent<any>> {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
			console.log(currentUser.token);
  if (currentUser.token) {
	  const cloned = req.clone({
		  headers: req.headers.set('Authorization', `Bearer ${ currentUser.token }`)
	  });

	  return next.handle(cloned);
  }

else {
	return next.handle(req);
}
}*/
};
