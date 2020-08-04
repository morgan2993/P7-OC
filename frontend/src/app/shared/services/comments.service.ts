import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@config/app.config';
import { Comment } from '@shared/models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
	constructor(private http: HttpClient) {}

	create(payload: Comment) {
		return this.http.post(`${Config.api}/comments/new`, payload);
  }

	update(payload: Comment) {
		return this.http.put(`${Config.api}/comments/${payload.id}`, payload);
	}

  getUser(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${Config.api}/comments/user/${id}`);
  }

	delete(id: number) { 
		return this.http.delete(`${Config.api}/comments/${id}`); 
  }

  forceDelete(id: number) {
    return this.http.delete(`${Config.api}/comment/admin/${id}`);
  }
}
