import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class UserDataResolver implements Resolve<any> {
	constructor(private auth: AuthService) {}

	resolve(): Observable<number> {
		return this.auth.store.pipe(take(1));
	}
}
