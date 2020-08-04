import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
	users: User[];

	constructor(
		private route: ActivatedRoute,
		private service: UserService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.users = this.route.snapshot.data.users;
	}

	deleteUser(user: User) {
		this.service
			.delete(user.id)
			.pipe(
				catchError((err) => {
					alert(err.error.error);
					return of(err);
				})
			)
			.subscribe(() => {
				this.users.splice(this.users.indexOf(user), 1);
				this.cd.markForCheck();
			});
  }
}
