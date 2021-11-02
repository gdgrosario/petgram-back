import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigType } from "@nestjs/config";

import config from "../../config/config";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: "10d"
          }
        };
      }
    })
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
