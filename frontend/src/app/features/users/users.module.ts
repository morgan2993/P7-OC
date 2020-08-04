import { NgModule } from '@angular/core';

import { RegisterComponent } from '@users/components/register/register.component';
import { ProfileComponent } from '@users/components/profile/profile.component';
import { LoginComponent } from '@users/components/login/login.component';
import { LogoutComponent } from '@users/components/logout/logout.component';
import { UsersComponent } from '@users/users.component';
import { UsersRoutingModule } from '@users/users-routing.module';
import { ListComponent } from '@users/components/list/list.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
	imports: [SharedModule, UsersRoutingModule],
	declarations: [
		UsersComponent,
		RegisterComponent,
		ProfileComponent,
		LoginComponent,
		LogoutComponent,
		ListComponent,
	]
})
export class UsersModule {}
