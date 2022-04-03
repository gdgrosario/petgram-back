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
        return this.generateJWT(user);
      }
    } else {
      throw new NotFoundException(`User not found. Verify your credentials.`);
    }
  }

  generateJWT(user: User) {
    const { nickname, name, role, id } = user;
    const payload: IPayloadToken = { role, sub: id, nickname, name };
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }

  async register(data: CreateUserDto) {
    const user = await this.userService.create(data);
    return await this.generateJWT(user);
  }
}
