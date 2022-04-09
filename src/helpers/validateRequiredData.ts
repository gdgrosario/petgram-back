import { BadRequestException } from "@nestjs/common";
import { CreateUserDto } from '../modules/users/dtos/user.dtos';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateRequiredData = (dataUser:CreateUserDto, required: string[]) => {
  console.log(dataUser);
    return required.forEach(field => {
      if (dataUser[field])
        throw new BadRequestException(`The field '${field}' is required.`).getResponse();
    });
  }