import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsEmail,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  readonly birthday: string;

  @IsString()
  @IsNotEmpty()
  readonly pictureProfile: string;

  @IsString()
  @IsNotEmpty()
  readonly bannerProfile: string;

  @IsString()
  readonly biography: string;

  @IsInt()
  readonly numberOfPosts: number;

  @IsInt()
  readonly numberOfFollowers: number;

  @IsInt()
  readonly numberOfFollowed: number;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly raza: string;

  @IsString()
  @IsNotEmpty()
  readonly sexo: string;

  @IsString()
  readonly phoneNumber: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
