import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { plainToClass } from "class-transformer";

import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { IPayloadToken } from "./models/token.model";
import { Hash } from "../../utils/Hash";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "../users/dtos/user.dtos";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login ({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);
    if(user) {
      const isMatch = Hash.compare(password, user.password);
      if(isMatch) {
        this.generateJWT(user);
      }
    }
    throw new NotFoundException(`User not found. Verify your credentials.`);
  }

  generateJWT(user: User) {
    const payload: IPayloadToken = { role: user.role, sub: user.id };
    const objUserToReturn = plainToClass(User, user);
    return {
      access_token: this.jwtService.sign(payload),
      objUserToReturn
    }
  }

  register(data: CreateUserDto) {
    const user = this.userService.findByEmail(data.email);
    if(!user) {
      this.userService.create(data);
    } else {
      throw new BadRequestException(`The email ${data.email} is already used.`);
    }
  }
}
