import { PostResolver } from './resolvers/post.resolver';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PostsRoutingModule } from '@posts/posts-routing.module';
import { CreateComponent } from '@posts/create/create.component';
import { PostsComponent } from '@posts/posts.component';

@NgModule({
  imports: [SharedModule, PostsRoutingModule],
  declarations: [CreateComponent, PostsComponent],
  providers: [PostResolver]
})
export class PostsModule { }
