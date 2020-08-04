import { PostsService } from '@shared/services/posts.service';
import { CommentsService } from '@shared/services/comments.service';
import { Comment } from '@shared/models/comment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Post } from '@shared/models/post.model';
import { catchError, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import 'moment/locale/fr';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';

@Component({
	selector: 'app-wall',
	templateUrl: './wall.component.html',
	styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
	user : User;
	userId: string = this.route.snapshot.data.user.userId;
	isAdmin: boolean = !!this.route.snapshot.data.user.userRole;
	wall: Post[] = this.route.snapshot.data.wall;
	//createdAt = moment(post.createdAt).format('D MMM YYYY');

	constructor(
		private readonly route: ActivatedRoute,
		private commentSvc: CommentsService,
		private userSvc: UserService,
		private postsSvc: PostsService
	) {}

	updateComments(payload): void {
		const { comment, postId } = payload;
		const newComment = {...comment, ...{User : this.user}};
		this.wall
			.filter((post) => post.id === postId)
			.forEach((item) => item.Comments.push(newComment));
			
	}

	editComment(comment: Comment): void {
		console.log('edit comment', comment);
	}

	deleteComment(comment: Comment): void {
		this.commentSvc.delete(comment.id).pipe(
			catchError((err) => {
				alert(err.error.error);
				return of(err); 
			}) 
		).subscribe(() => {
			this.wall.filter(post => post.id === comment.PostId).forEach(item => {
				item.Comments.splice(item.Comments.indexOf(comment), 1); 

			}); 
		});
	}

	deletePost(post: Post): void {
		this.postsSvc.delete(post.id).pipe(
			catchError((err) => {
				alert(err.error.error);
				return of(err);
			})
		).subscribe(() => this.wall.splice(this.wall.indexOf(post), 1));
	}

	updateDate(createdAt) {
		
		return moment(createdAt).fromNow();
		
	}

	getCurrentUser() {
		this.userSvc.getOne(+this.userId)
		.pipe(
			take(1)
		)
		.subscribe((user) => {
			this.user = user;
		})
	}

	ngOnInit() {
		this.getCurrentUser();
		
	}

}
