import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallComponent } from '@wall/wall.component';
import { WallResolver } from '@wall/resolvers/wall.resolver';
import { UserDataResolver } from '@shared/resolvers/user-data.resolver';

const routes: Routes = [
	{
		path: '',
		component: WallComponent,
		resolve: {
			wall: WallResolver,
			user: UserDataResolver
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [WallResolver],
})
export class WallRoutingModule {}
