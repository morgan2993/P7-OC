import { UserService } from '@shared/services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class UserProfileResolver implements Resolve<any> {
	constructor(private svc: UserService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		const userId = Number(route.paramMap.get('id'));
		return this.svc.getProfile(userId).pipe(take(1));
	}
}
