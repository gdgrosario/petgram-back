import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  Request,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUserDto } from "./dtos/user.dtos";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  getAll(@Query("limit") limit = 100, @Query("offset") offset = 0): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  getOne(@Param("userId") userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async update(@Body() updateUserDTO: UpdateUserDto, @Request() req: any) {
    const { _id } = req.user;
    return await this.usersService.updateProfile(_id, updateUserDTO);
  }

  @Put("/recover-password")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async recoverPassword(@Body() updateUser: UpdateUserDto, @Request() req: any) {
    const { _id } = req.user;
    return await this.usersService.recoverPassword(_id, updateUser.password);
  }
}
