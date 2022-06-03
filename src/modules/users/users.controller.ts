import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Auth } from "../auth/decorator/auth.decorator";
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

  @Get("/profile")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  getProfile(@Auth() { id }:User ):Promise<User> {
    return this.usersService.findOne(id)
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
  update(@Body() updateUserDTO: UpdateUserDto, @Auth() {id}:User ):Promise<User> {
    return this.usersService.updateProfile(id, updateUserDTO);
  }

  @Get("/get-user-name/:userName")
  @HttpCode(HttpStatus.OK)
  getForUserName(@Param("userName") userName: string): Promise<User> {
    return this.usersService.findOneByUserName(userName);
  }

  @Put("/recover-password")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  recoverPassword(@Body() updateUser: UpdateUserDto, @Auth() {id}:User ):Promise<{message: string}> {
    return this.usersService.recoverPassword(id, updateUser.password);
  }

  @Post("/follow/:idfollow")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  follow(@Param("idfollow") idFollow: string, @Auth() {id}:User): Promise<{message: string}> {
    return this.usersService.follow(id, idFollow);
  }

  @Put("/unfollow/:idfollow")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  unFollow(@Param("idfollow") idFollow: string, @Auth() {id}:User): Promise<{message: string}> {
    return this.usersService.unFollow(id, idFollow);
  }

  @Get("get-users-by-nickname/:nickname")
  @HttpCode(HttpStatus.OK)
  getUsersByNickname(@Param("nickname") nickname: string): Promise<User[]> {
    return this.usersService.findUsersByNickname(nickname);
  }
}
