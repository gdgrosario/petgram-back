import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEmail,
  IsOptional,
  Matches,
  MaxLength
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "The nickname is required" })
  @Matches(/^[a-z0-9_.]+$/, {
    message: "The nickname must contain only 0-9, a-z, y -,."
  })
  readonly nickname: string;

  @IsString()
  @IsNotEmpty({ message: "The name is required" })
  readonly name: string;

  @IsOptional()
  @IsNotEmpty({ message: "Birth date is required" })
  readonly birthday: string;

  @IsString()
  @IsOptional()
  readonly biography: string;

  @IsInt()
  @IsOptional()
  readonly numberOfPosts: number;

  @IsInt()
  @IsOptional()
  readonly numberOfFollowers: number;

  @IsInt()
  @IsOptional()
  readonly numberOfFollowed: number;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MaxLength(10, { message: "Password must have a maximum of 10 characters" })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly raza: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly sexo: string;

  @IsString()
  @IsOptional()
  readonly phoneNumber: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export interface IResponseToken {
  access_token: string;
  user: CreateUserDto;
}
