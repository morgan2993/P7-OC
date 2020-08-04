import { GenericProperties } from './generic-properties.model';
import { User } from './user.model';

export class Comment extends GenericProperties {
	PostId: number;
	UserId: number;
	content: string;
	User?: User;
}
