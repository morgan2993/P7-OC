import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGuard } from '@core/guards/user.guard';
import { AuthGuard } from '@core/guards/auth.guard';

import { UsersComponent } from '@users/users.component';
import { LoginComponent } from '@users/components/login/login.component';
import { RegisterComponent } from '@users/components/register/register.component';
import { ProfileComponent } from '@users/components/profile/profile.component';
import { UserProfileResolver } from '@users/components/profile/resolvers/user-profile.resolver';
import { LogoutComponent } from '@users/components/logout/logout.component';
import { ListComponent } from '@users/components/list/list.component';
import { UsersResolver } from '@users/components/list/resolvers/users.resolver';

const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent,
				canActivate: [UserGuard],
			},
			{
				path: 'logout',
				component: LogoutComponent,
			},
			{
				path: 'register',
				component: RegisterComponent,
				canActivate: [UserGuard],
			},
			{
				path: 'view/:id',
				component: ProfileComponent,
				resolve: {
					mix: UserProfileResolver,
				},
				canActivate: [AuthGuard],
			},
			{
				path: 'list',
				component: ListComponent,
				resolve: {
					users: UsersResolver,
				},
				canActivate: [AuthGuard],
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [UsersResolver, UserProfileResolver],
})
export class UsersRoutingModule {}
