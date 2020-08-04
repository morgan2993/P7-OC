import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BearerService implements HttpInterceptor {
	bearer: string = null;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headers = req.headers.set('Content-Type', 'application/json');
		const authReq = req.clone({ headers });
		return next.handle(authReq);
	}
}
