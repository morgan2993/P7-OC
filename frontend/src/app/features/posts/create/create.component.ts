import { ActivatedRoute, Router } from '@angular/router';
import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, map, switchMap } from 'rxjs/operators';

import { of, noop } from 'rxjs';

import { Post } from '@shared/models/post.model';
import { PostsService } from '@shared/services/posts.service';
import { UploadService } from '@shared/services/upload.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	title: string;
	postForm: FormGroup;

	@ViewChild('fileUpload') fileUpload: ElementRef<HTMLElement>;

	constructor(
		private fb: FormBuilder,
		private postsSvc: PostsService,
		private uploadSvc: UploadService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		const userId = this.route.snapshot.data.user.userId;
		this.title = this.route.snapshot.data.title;
		this.postForm = this.fb.group({
			title: ['', Validators.required],
			content: ['', Validators.required],
			UserId: [userId, Validators.required],
			image: [null]
		});

		if (this.title === 'edit') {
			this.hydrateFields(this.route.snapshot.data.post);
		}
	}

	onSubmit(): void {
		const image = this.fileUpload.nativeElement as HTMLInputElement;

		if (!!image.files.length) {
			this.uploadSvc.upload(image.files).pipe(
				switchMap((res: {[key: string]: string}) => {
					this.postForm.get('image').patchValue(res.filename);
					return this.postsSvc.create(this.postForm.value);
				}),
				map(() => this.router.navigate(['/wall'])),
				catchError((err) => {
					alert(err.error.error);
					return of(err);
				})
			).subscribe(() => noop());
		} else {
			this.postsSvc
				.create(this.postForm.value)
				.pipe(
					map(() => this.router.navigate(['/wall'])),
					catchError((err) => {
						alert(err.error.error);
						return of(err);
					})
				)
				.subscribe(() => noop());
		}
	}

	onSubmitChanges(): void {
		this.postsSvc
			.update({
				changes: this.postForm.value,
				postId: this.route.snapshot.data.post.id,
			})
			.pipe(
				map(() => this.router.navigate(['/wall'])),
				catchError((err) => {
					alert(err.error.error);
					return of(err);
				})
			)
			.subscribe(() => noop());
	}

	private hydrateFields(post: Post) {
		this.postForm.patchValue({
			title: post.title,
			content: post.content,
			UserId: post.UserId,
			image: post.url_image,
		});
	}
}
