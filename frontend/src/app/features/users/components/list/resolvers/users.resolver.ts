import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';

@Injectable()
export class UsersResolver implements Resolve<any> {
	constructor(private service: UserService) {}

	resolve(): Observable<User[]> {
		return this.service.getMany().pipe(
			take(1)
		);
	}
}
