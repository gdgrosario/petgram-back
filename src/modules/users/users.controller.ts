import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { User } from './entities/user.entity';
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  getAll(@Query("limit") limit = 100, @Query("offset") offset = 0):Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  getOne(@Param("userId") userId: string):Promise<User> {
    return this.usersService.findOne(userId);
  }
}
