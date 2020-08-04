import { Post } from '@shared/models/post.model';
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
import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  users: User[];
  user: User = this.route.snapshot.data.mix[0];
  posts: Post[] = this.route.snapshot.data.mix[1];
  constructor(private route: ActivatedRoute, private service: UserService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
		this.users = this.route.snapshot.data.users;
	}

  
  updateDate(createdAt) {
		
		return moment(createdAt).format('LLLL');
		
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



