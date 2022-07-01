import { User } from '../../users/schemas/user.schema';

export interface IResponseToken {
  access_token: string;
  user: User;
}
