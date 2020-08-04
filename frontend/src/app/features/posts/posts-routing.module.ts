import { PostResolver } from './resolvers/post.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from '@posts/posts.component';
import { CreateComponent } from '@posts/create/create.component';
import { UserDataResolver } from '@shared/resolvers/user-data.resolver';

const routes: Routes = [
	{
    path: '',
    component: PostsComponent,
		children: [
			{
				path: 'create',
				component: CreateComponent,
				data: { title: 'create' },
				resolve: {
					user: UserDataResolver
				}
			},
			{
				path: 'edit/:id',
				component: CreateComponent,
				data: { title: 'edit' },
				resolve: {
					post: PostResolver,
					user: UserDataResolver
				}
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PostsRoutingModule {}
