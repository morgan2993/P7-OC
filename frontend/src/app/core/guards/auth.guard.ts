import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	  ): Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.store.pipe(
			switchMap(isLogged => {
				if (!isLogged) {
					this.router.navigate(['/users/login']);
					return of(false)
				} else {
					
					return of(true)
				}
			})
			
		) as Observable<boolean>;
		

	}

}
