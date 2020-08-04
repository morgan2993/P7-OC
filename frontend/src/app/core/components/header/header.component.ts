import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@shared/models/user.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	@Input() isLogged: boolean;
	@Input() isAdmin: boolean;
	@Input() userData: User;
}
