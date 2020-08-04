import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '@shared/services/auth.service';
import { of, noop } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const qp = this.route.snapshot.queryParamMap;
		const mail = qp.has('mail') ? qp.get('mail') : '';
		this.loginForm = this.fb.group({
			mail: [mail, Validators.required],
			mdp: ['', Validators.required],
		});
	}

	onSubmit(): void {
		this.auth
			.login(this.loginForm.value)
			.pipe(
				map((res) => this.auth.store.next(res)),
				catchError((err) => {
					alert(err.error.error);
					return of(err);
				})
			)
			.subscribe(() => noop());
	}
}
