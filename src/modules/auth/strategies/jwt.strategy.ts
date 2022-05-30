import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy, ExtractJwt } from "passport-jwt";
import config from "../../../config/config";
import { IPayloadToken } from "../models/token.model";
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private userService: UsersService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret
    });
  }

  async validate(payload: IPayloadToken): Promise<User> {
    const { sub } = payload
    const user = await this.userService.findOne(sub)
    if(!user) throw new UnauthorizedException()
    return user
  }
}
