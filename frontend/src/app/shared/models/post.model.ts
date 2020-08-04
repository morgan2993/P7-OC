import { GenericProperties } from './generic-properties.model';
import { Comment } from './comment.model';
import { User } from './user.model';

export class Post extends GenericProperties {
	Comments: Comment[];
	User?: User;
	UserId: string;
	title: string;
	content: string;
	// tslint:disable-next-line: variable-name
	url_image?: string;
}
