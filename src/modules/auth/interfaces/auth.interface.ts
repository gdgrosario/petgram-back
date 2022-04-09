import { User } from "../../users/entities/user.entity";

export interface IResponseToken {
  access_token: string;
  user: User;
}
