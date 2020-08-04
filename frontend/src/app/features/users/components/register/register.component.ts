import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of, noop } from 'rxjs';

import { UserService } from '@shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private user: UserService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			mail: ['', Validators.required],
			mdp: ['', Validators.required],
			admin: [0],
		});
	}

	onSubmit(): void {
		this.user
			.create(this.registerForm.value)
			.pipe(
				map(() => this.router.navigate(['../login'], {
					queryParams: { mail: this.registerForm.get('mail').value },
					relativeTo: this.route
				})),
				catchError((err) => {
					alert(err.error.error);
					return of(err);
				})
			)
			.subscribe(() => noop());
	}
}
