import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, pluck } from 'rxjs/operators';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class UserIdResolver implements Resolve<any> {
	constructor(private auth: AuthService) {}

	resolve(): Observable<any> {
		return this.auth.store.pipe(
			pluck('userId'),
			take(1)
		);
	}
}
