import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}
	canActivate(): boolean {
		return !this.auth.isLogged;
	}
}
