import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../../users/services/users.service";
import { User } from "../../users/entities/user.entity";
import { IPayloadToken } from "../models/token.model";
import { Hash } from "../../../utils/Hash";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = Hash.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: IPayloadToken = { nickname: user.nickname, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }
}
