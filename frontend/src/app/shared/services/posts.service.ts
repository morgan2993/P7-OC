import { Post } from '@shared/models/post.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@config/app.config';

@Injectable({ providedIn: 'root' })
export class PostsService {
	constructor(private http: HttpClient) {}

	create(payload: Post) {
		return this.http.post(`${Config.api}/posts/new`, payload);
  }

	update(payload: { changes: Post, postId: number }) {
		return this.http.put(`${Config.api}/posts/${payload.postId}`, payload.changes);
	}

	getOne(id: number): Observable<Post> {
		return this.http.get<Post>(`${Config.api}/posts/${id}`);
	}

	getMany(): Observable<Post[]> {
		return this.http.get<Post[]>(`${Config.api}/posts`);
  }

  getUser(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${Config.api}/posts/user/${id}`);
  }

	delete(id: number) {
		return this.http.delete(`${Config.api}/posts/${id}`);
  }

  forceDelete(id: number) {
    return this.http.delete(`${Config.api}/posts/admin/${id}`);
  }
}
