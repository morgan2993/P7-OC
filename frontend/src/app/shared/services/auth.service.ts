import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.model';
import { map } from 'rxjs/operators';

import { distinctUntilChanged, tap } from 'rxjs/operators';
import { BehaviorSubject, pipe, Observable, from } from 'rxjs';

import { Config } from '@config/app.config';

import * as moment from "moment";

@Injectable({ providedIn: 'root' })
export class AuthService {
	isLogged = false;
	isAdmin = false;
	public currentUser: Observable<User>;
    

	store: BehaviorSubject<any> = new BehaviorSubject(null);
	

	constructor(private http: HttpClient, private router: Router) {
        if (localStorage.getItem('currentUser')) {
            this.store.next(JSON.parse(localStorage.getItem('currentUser')))
        }
		this.store.pipe(distinctUntilChanged()).subscribe((value) => {
			if (!!value) {
				this.isLogged = true;
                this.isAdmin = !!value.userRole;
				this.router.navigate(['/wall']);
			} else {
				this.isLogged = false;
				this.isAdmin = false;
			}
			this.currentUser = this.store.asObservable();
		});
	}

	login(payload: {[key: string]: string}) {
		return this.http.post(`${Config.api}/user/login`, payload)
		.pipe(map(user => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('currentUser', JSON.stringify(user));
		
			this.store.next(user);
			return user;
				
			
	}));
}

	

	logout() {
		
		this.router.navigate(['/users/login']);
		localStorage.removeItem('currentUser');
        this.store.next(null);
	}




}



/*@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(email:string, password:string ) {
        return this.http.post<User>('/api/login', {email, password})
            .do(res => this.setSession) 
            .shareReplay();
    }
          
    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}*/
