import { IResponseToken } from "@dto/create-user.dto";
import { User } from "@entity";

//TODO: hacer entiti user

export abstract class ICrmServices {
  abstract register(data: User): Promise<IResponseToken>;
}
