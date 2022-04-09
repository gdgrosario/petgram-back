import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query
} from "@nestjs/common";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    return this.usersService.findAll();
  }

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  getOne(@Param("userId", ParseIntPipe) userId: string) {
    return this.usersService.findOne(userId);
  }
}
