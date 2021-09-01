import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from "@nestjs/common";

import { UsersService } from "./../../services/users/users.service";
import { CreateUserDto, UpdateUserDto } from "../../dtos/user.dtos";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    return this.usersService.findAll();
  }

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  getOne(@Param("userId", ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(":userId")
  @HttpCode(HttpStatus.OK)
  update(@Body() payload: UpdateUserDto, @Param("userId", ParseIntPipe) userId: number) {
    return this.usersService.update(userId, payload);
  }

  @Delete(":userId")
  @HttpCode(HttpStatus.OK)
  delete(@Param("userId", ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }
}
