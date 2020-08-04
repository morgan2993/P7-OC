import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PostsService } from '@shared/services/posts.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Post } from '@shared/models/post.model';

@Injectable()
export class PostResolver implements Resolve<any> {
	constructor(private posts: PostsService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
		const postId = Number(route.paramMap.get('id'));
		return this.posts.getOne(postId).pipe(
			take(1)
		);
	}
}
