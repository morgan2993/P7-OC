import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { WallRoutingModule } from '@wall/wall-routing.module';
import { WallComponent } from '@wall/wall.component';
import { CommentComponent } from '@wall/components/comment/comment.component';

@NgModule({
	declarations: [WallComponent, CommentComponent],
	imports: [SharedModule, WallRoutingModule],
})
export class WallModule {}
