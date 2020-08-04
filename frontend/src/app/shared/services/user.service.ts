import { switchMap, concatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@config/app.config';
import { User } from '@shared/models/user.model';
import { PostsService } from './posts.service';

@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(private http: HttpClient, private postsSvc: PostsService) {}

	create(payload) {
		return this.http.post(`${Config.api}/user/signup`, payload);
	}

	getOne(id: number): Observable<User> {
		return this.http.get<User>(`${Config.api}/user/${id}`);
	}

	getMany(): Observable<User[]> {
		return this.http.get<User[]>(`${Config.api}/user`);
	}

	getProfile(id: number): Observable<any> {
		return this.http.get(`${Config.api}/user/${id}`).pipe(
			switchMap(user => {
				return this.postsSvc.getUser(id).pipe(
					map(posts => [user, posts])
				);
			})
		);
	}

	delete(id: number) {
		return this.http.delete(`${Config.api}/user/delete/${id}`);
	}
}
