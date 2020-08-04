import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from '@shared/services/comments.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
	showForm = false;
	commentForm: FormGroup;

	@Input() postId: string;
	@Input() userId: string;

	@Output() updateComments = new EventEmitter();

	constructor(private fb: FormBuilder, private service: CommentsService) {}

	ngOnInit(): void {
		this.commentForm = this.fb.group({
			content: ['', Validators.required],
			PostId: [this.postId, Validators.required],
			UserId: [this.userId, Validators.required],
		});
	}

	onSubmit(): void {
		this.service
			.create(this.commentForm.value)
			.pipe(
				tap(({response}: any) =>
			{
				const newComment = {
					content: response.content,
					id: response.id,
					UserId: response.UserId,
					PostId: response.PostId,
				};
					this.updateComments.emit({
						comment: newComment,
						postId: response.PostId,					
					

					})
				
				}
				),
				catchError((err) => {
					alert(err.error.error);
					return of(err);
				})
			).subscribe((_) => {
				(this.showForm = false)
			});
	}
}
