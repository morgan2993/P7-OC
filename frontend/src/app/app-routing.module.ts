import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'wall',
	},
	{
		path: 'users',
		loadChildren: () =>
			import('./features/users/users.module').then((m) => m.UsersModule),
	},
	{
		path: 'wall',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./features/wall/wall.module').then((m) => m.WallModule),
	},
	{
		path: 'posts',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./features/posts/posts.module').then((m) => m.PostsModule),
	},
	{ 
		path: '**', 
		redirectTo: 'wall' 
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
