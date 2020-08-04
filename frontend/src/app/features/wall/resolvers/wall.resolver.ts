import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PostsService } from '@shared/services/posts.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Post } from '@shared/models/post.model';

@Injectable()
export class WallResolver implements Resolve<any> {
	constructor(private posts: PostsService) {}

	resolve(): Observable<Post[]> {
		return this.posts.getMany().pipe(
			take(1)
		);
	}
}
