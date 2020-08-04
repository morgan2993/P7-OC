import { GenericProperties } from './generic-properties.model';

export class User extends GenericProperties{
  firstname: string;
  lastname: string;
  mail?: string;
  mdp?: string;
  admin: number;
  token?: string;
}
