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
  @IsNotEmpty({ message: "El nickname es requerido" })
  //regular expression for nickname
  // eslint-disable-next-line no-useless-escape
  @Matches(/^[a-z0-9_\.]+$/, {
    message: "El nickname debe contener solo 0-9, a-z, y -,."
  })
  readonly nickname: string;

  @IsString()
  @IsNotEmpty({ message: "El nombre es requerido" })
  readonly name: string;

  @IsOptional()
  @IsNotEmpty({ message: "La fecha de nacimiento es requerida" })
  readonly birthday: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly pictureProfile: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly bannerProfile: string;

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
  @IsNotEmpty({ message: "La contraseña es requerida" })
  @MaxLength(10, { message: "La contraseña debe tener un máximo de 10 caracteres" })
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

  @IsString()
  @IsOptional()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
