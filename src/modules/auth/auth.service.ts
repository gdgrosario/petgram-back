import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";
import { IPayloadToken } from "./models/token.model";
import { Hash } from "../../utils/Hash";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "../users/dtos/user.dtos";
import { IResponseToken } from "./interfaces/auth.interface";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login({ email, password }: LoginDto): Promise<IResponseToken | string | unknown> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = Hash.compare(password, user.password);
      if (isMatch) {
        return this.generateJWT(user);
      } else {
        throw new BadRequestException("Password or email is incorrect");
      }
    } else {
      throw new NotFoundException(`User not found. Verify your credentials.`);
    }
  }

  generateJWT(user: User): IResponseToken {
    const { nickname, name, role, id } = user;
    const payload: IPayloadToken = { role, sub: id, nickname, name };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async register(data: CreateUserDto): Promise<IResponseToken> {
    const user = await this.userService.create(data);
    if (user) {
      return this.generateJWT(user);
    }

    throw new BadRequestException("The user already exists");
  }
}
